/* app.js */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const path = require('path');
const fs = require('fs');

const { connectDB } = require('./config/db');

/* Initialize app and core middleware */
const app = express();

/* Security headers */
app.use(helmet());

/* Body parsing */
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

/* Cookies */
app.use(cookieParser());

/* CORS with credentials and allowed origins */
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server or tools like curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

/* Rate limiting */
app.use(
  rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),              // 100 requests
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* Database */
connectDB();

/* Seed first admin if none exists (promote oldest user) */
const User = require('./models/User');
(async function ensureAdminSeed() {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount === 0) {
      const oldest = await User.findOne({}).sort({ createdAt: 1 });
      if (oldest) {
        if (oldest.role !== 'admin') {
          oldest.role = 'admin';
          await oldest.save();
        }
        console.log(`Admin seeded: ${oldest.email}`);
      }
    }
  } catch (err) {
    console.error('Admin seed error:', err);
  }
})();

/* Passport (OAuth) */
require('./config/passport');
app.use(passport.initialize());

/* Health route */
app.get('/', (_req, res) => {
 res.send('Server is running');
});

// Static serving for uploaded files
const UPLOADS_DIR = path.join(__dirname, 'uploads');
try { fs.mkdirSync(path.join(UPLOADS_DIR, 'videos'), { recursive: true }); } catch (_e) {}
app.use('/uploads', express.static(UPLOADS_DIR));

/* API routes */
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/contact'));
/* Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});
