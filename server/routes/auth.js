const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail } = require('../utils/email');
const { signToken, setAuthCookie, clearAuthCookie } = require('../utils/jwt');
const { optionalAuth, requireAuth } = require('../middleware/auth');

const router = express.Router();

const clientURL = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0];
const serverURL = process.env.SERVER_URL || 'http://localhost:5000';

/**
 * Helper to build verification link
 */
function buildVerifyLink(token) {
  // Backend handles verification by GET /api/auth/verify
  return `${serverURL.replace(/\/+$/, '')}/api/auth/verify?token=${encodeURIComponent(token)}`;
}

/** Strategy presence helper (for dev when OAuth envs are not set) */
function hasStrategy(name) {
  try {
    return !!passport._strategy(name);
  } catch {
    return false;
  }
}

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
router.post('/signup', async (req, res) => {
  try {
    const { name = '', email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ ok: false, error: 'Email already in use' });
    }

    const user = new User({
      name: String(name).trim(),
      email: email.toLowerCase(),
      provider: 'local',
      verified: false,
    });
    await user.setPassword(password);

    // create verification token
    const token = crypto.randomBytes(32).toString('hex');
    const hours = parseInt(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_HOURS || '24', 10);
    user.verificationToken = token;
    user.verificationTokenExpires = new Date(Date.now() + hours * 60 * 60 * 1000);

    await user.save();

    // send verification email
    const link = buildVerifyLink(token);
    await sendEmail({
      subject: 'Verify your email - Trimzo Portal',
      to: user.email,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
          <p>Hi ${user.name || 'there'},</p>
          <p>Thanks for signing up. Please verify your email by clicking the button below:</p>
          <p><a href="${link}" style="display:inline-block;background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Verify Email</a></p>
          <p>Or copy-paste this link into your browser:</p>
          <p style="word-break:break-all">${link}</p>
          <p>This link expires in ${hours} hours.</p>
        </div>
      `,
      text: `Verify your email: ${link}`,
    });

    return res.status(201).json({ ok: true, message: 'Signup successful, please verify your email' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to signup' });
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ ok: false, error: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ ok: false, error: 'Invalid credentials' });

    if (!user.verified) {
      return res.status(403).json({ ok: false, error: 'Email not verified' });
    }

    const token = signToken(user);
    setAuthCookie(res, token);

    return res.json({ ok: true, user: user.toSafeJSON() });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to login' });
  }
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', (_req, res) => {
  clearAuthCookie(res);
  return res.json({ ok: true });
});

/**
 * GET /api/auth/me
 */
router.get('/me', optionalAuth, (req, res) => {
  if (!req.user) return res.status(200).json({ ok: true, user: null });
  return res.json({ ok: true, user: req.user.toSafeJSON() });
});

/**
 * POST /api/auth/resend-verification
 * Body: { email }
 */
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = (req.body || {});
    if (!email) return res.status(400).json({ ok: false, error: 'email is required' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ ok: false, error: 'User not found' });
    if (user.verified) return res.json({ ok: true, message: 'Already verified' });

    // new token
    const token = crypto.randomBytes(32).toString('hex');
    const hours = parseInt(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_HOURS || '24', 10);
    user.verificationToken = token;
    user.verificationTokenExpires = new Date(Date.now() + hours * 60 * 60 * 1000);
    await user.save();

    const link = buildVerifyLink(token);
    await sendEmail({
      subject: 'Verify your email - Trimzo Portal',
      to: user.email,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
          <p>Hi ${user.name || 'there'},</p>
          <p>Please verify your email by clicking the button below:</p>
          <p><a href="${link}" style="display:inline-block;background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Verify Email</a></p>
          <p>Or copy-paste this link into your browser:</p>
          <p style="word-break:break-all">${link}</p>
        </div>
      `,
      text: `Verify your email: ${link}`,
    });

    return res.json({ ok: true, message: 'Verification email sent' });
  } catch (err) {
    console.error('Resend verification error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send verification email' });
  }
});

/**
 * GET /api/auth/verify?token=...
 */
router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query || {};
    if (!token) return res.status(400).send('Invalid verification link');

    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).send('Invalid or expired token');

    if (user.verificationTokenExpires && user.verificationTokenExpires.getTime() < Date.now()) {
      return res.status(400).send('Token expired, please request a new verification email');
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // After verifying, redirect to client login page with status
    const redirectUrl = `${clientURL.replace(/\/+$/, '')}/login?verified=1`;
    return res.redirect(302, redirectUrl);
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).send('Failed to verify email');
  }
});

/**
 * OAuth - Google
 */
router.get('/google', (req, res, next) => {
  try {
    if (!passport._strategy('google')) {
      return res.status(503).json({ ok: false, error: 'Google OAuth not configured' });
    }
  } catch (_) {
    return res.status(503).json({ ok: false, error: 'Google OAuth not configured' });
  }
  return passport.authenticate('google', { scope: ['profile', 'email'], session: false })(req, res, next);
});
 
router.get('/google/callback', (req, res, next) => {
  try {
    if (!passport._strategy('google')) {
      return res.status(503).json({ ok: false, error: 'Google OAuth not configured' });
    }
  } catch (_) {
    return res.status(503).json({ ok: false, error: 'Google OAuth not configured' });
  }
  return passport.authenticate('google', { failureRedirect: '/api/auth/oauth-failed', session: false })(req, res, next);
}, async (req, res) => {
  try {
    const user = req.user;
    const token = signToken(user);
    setAuthCookie(res, token);
    const redirectUrl = `${clientURL.replace(/\/+$/, '')}/portal?login=google`;
    return res.redirect(302, redirectUrl);
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return res.redirect(302, `${clientURL.replace(/\/+$/, '')}/login?error=oauth`);
  }
});

/**
 * OAuth - GitHub
 */
router.get('/github', (req, res, next) => {
  try {
    if (!passport._strategy('github')) {
      return res.status(503).json({ ok: false, error: 'GitHub OAuth not configured' });
    }
  } catch (_) {
    return res.status(503).json({ ok: false, error: 'GitHub OAuth not configured' });
  }
  return passport.authenticate('github', { scope: ['user:email'], session: false })(req, res, next);
});
 
router.get('/github/callback', (req, res, next) => {
  try {
    if (!passport._strategy('github')) {
      return res.status(503).json({ ok: false, error: 'GitHub OAuth not configured' });
    }
  } catch (_) {
    return res.status(503).json({ ok: false, error: 'GitHub OAuth not configured' });
  }
  return passport.authenticate('github', { failureRedirect: '/api/auth/oauth-failed', session: false })(req, res, next);
}, async (req, res) => {
  try {
    const user = req.user;
    const token = signToken(user);
    setAuthCookie(res, token);
    const redirectUrl = `${clientURL.replace(/\/+$/, '')}/portal?login=github`;
    return res.redirect(302, redirectUrl);
  } catch (err) {
    console.error('GitHub OAuth callback error:', err);
    return res.redirect(302, `${clientURL.replace(/\/+$/, '')}/login?error=oauth`);
  }
});

/**
 * GET /api/auth/oauth-failed
 */
router.get('/oauth-failed', (_req, res) => {
  return res.status(401).json({ ok: false, error: 'OAuth failed' });
});

module.exports = router;