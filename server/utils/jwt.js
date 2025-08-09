const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function signToken(user) {
  const payload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role || 'user',
    provider: user.provider || 'local',
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (_) {
    return null;
  }
}

function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieSecure = String(process.env.COOKIE_SECURE || 'false') === 'true' || isProd;
  res.cookie('token', token, {
    httpOnly: true,
    secure: cookieSecure,
    sameSite: cookieSecure ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    path: '/',
  });
}

function clearAuthCookie(res) {
  const isProd = process.env.NODE_ENV === 'production';
  const cookieSecure = String(process.env.COOKIE_SECURE || 'false') === 'true' || isProd;
  res.clearCookie('token', {
    httpOnly: true,
    secure: cookieSecure,
    sameSite: cookieSecure ? 'none' : 'lax',
    path: '/',
  });
}

module.exports = {
  signToken,
  verifyToken,
  setAuthCookie,
  clearAuthCookie,
};