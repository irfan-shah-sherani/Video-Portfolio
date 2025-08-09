const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

function extractToken(req) {
  const bearer = req.headers.authorization || '';
  if (bearer.startsWith('Bearer ')) return bearer.slice(7);
  if (req.cookies && req.cookies.token) return req.cookies.token;
  return null;
}

async function optionalAuth(req, _res, next) {
  const token = extractToken(req);
  if (!token) return next();
  const payload = verifyToken(token);
  if (!payload) return next();
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      req.user = user;
      req.auth = payload;
    }
  } catch (_e) {}
  return next();
}

async function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ ok: false, error: 'Invalid token' });
  try {
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ ok: false, error: 'User not found' });
    req.user = user;
    req.auth = payload;
    return next();
  } catch (_e) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
}

function requireVerified(req, res, next) {
  if (!req.user) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  if (!req.user.verified) {
    return res.status(403).json({ ok: false, error: 'Email not verified' });
  }
  return next();
}

function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  if (req.user.role !== 'admin') {
    return res.status(403).json({ ok: false, error: 'Forbidden' });
  }
  return next();
}

module.exports = {
  optionalAuth,
  requireAuth,
  requireVerified,
  requireAdmin,
};