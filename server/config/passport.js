const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

const clientURL = process.env.CLIENT_URL?.split(',')?.[0] || 'http://localhost:5173';
const serverURL = process.env.SERVER_URL || 'http://localhost:5000';

function buildCallbackPath(provider) {
  return `/api/auth/${provider}/callback`;
}

function buildCallbackURL(provider) {
  // Prefer explicit CALLBACK_URL from env, else compose from SERVER_URL
  const envKey = `${provider.toUpperCase()}_CALLBACK_URL`;
  return process.env[envKey] || `${serverURL}${buildCallbackPath(provider)}`;
}

// Google OAuth
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: buildCallbackURL('google'),
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email =
            (profile.emails && profile.emails[0] && profile.emails[0].value) || '';
          const name = profile.displayName || '';
          const avatarUrl =
            (profile.photos && profile.photos[0] && profile.photos[0].value) || '';
          const user = await User.upsertOAuthUser('google', profile.id, {
            email,
            name,
            avatarUrl,
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

// GitHub OAuth
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: buildCallbackURL('github'),
        scope: ['user:email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          let email = '';
          if (Array.isArray(profile.emails) && profile.emails.length > 0) {
            // Prefer verified email
            const verified = profile.emails.find((e) => e.verified) || profile.emails[0];
            email = verified.value || '';
          }
          const name = profile.displayName || profile.username || '';
          const avatarUrl =
            (profile.photos && profile.photos[0] && profile.photos[0].value) || '';
          const user = await User.upsertOAuthUser('github', profile.id, {
            email,
            name,
            avatarUrl,
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

module.exports = passport;