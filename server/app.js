/* app.js */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const passport = require('passport');

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

/* CORS with credentials */
const allowedOrigins = (process.env.CLIENT_URL || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(
 cors({
   origin(origin, cb) {
     if (!origin) return cb(null, true);
     if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return cb(null, true);
     return cb(new Error('Not allowed by CORS'));
   },
   credentials: true,
 })
);

/* Rate limiting */
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const maxReq = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
app.use(
 rateLimit({
   windowMs,
   max: maxReq,
   standardHeaders: true,
   legacyHeaders: false,
 })
);

/* Database */
connectDB();

/* Passport (OAuth) */
require('./config/passport');
app.use(passport.initialize());

/* Health route */
app.get('/', (_req, res) => {
 res.send('Server is running');
});

/* Contact routes (existing functionality preserved) */
// Separate route for contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, whatsapp, budget, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are required' });
  }
  try {
    const { sendEmail } = require('./utils/email');

    const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;
    const subject = `New contact form message from ${name}`;
    const text = `Name: ${name}
Email: ${email}
${whatsapp ? `WhatsApp: ${whatsapp}\n` : ''}${budget ? `Budget: ${budget}\n` : ''}Message:
${message}
`;
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ''}
      ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-line">${message}</p>
    </div>`;

    await sendEmail({ subject, to: toEmail, html, text, replyTo: email });
    return res.status(200).json({ ok: true, message: 'Email sent' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

// Separate route for newsletter subscribe (email only)
app.post('/api/subscribe', async (req, res) => {
  const { email, whatsapp } = req.body || {};
  if (!email && !whatsapp) {
    return res.status(400).json({ ok: false, error: 'email or whatsapp is required' });
  }
  try {
    const { sendEmail } = require('./utils/email');

    const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;
    const subject = 'New footer lead';
    const text = `${email ? `Email: ${email}\n` : ''}${whatsapp ? `WhatsApp: ${whatsapp}\n` : ''}Source: Footer`;
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ''}
      <p><em>Source: Footer</em></p>
    </div>`;

    await sendEmail({ subject, to: toEmail, html, text, replyTo: email });
    return res.status(200).json({ ok: true, message: 'Lead email sent' });
  } catch (err) {
    console.error('Footer lead email error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to process subscription' });
  }
});

app.post('/api/send-message', async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are required' });
  }
  try {
    const { sendEmail } = require('./utils/email');

    const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;
    const subject = `New contact form message from ${name}`;
    const text = `Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}Message:
${message}
`;
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-line">${message}</p>
    </div>`;

    await sendEmail({ subject, to: toEmail, html, text, replyTo: email });
    return res.status(200).json({ ok: true, message: 'Email sent' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

/* API routes */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/videos'));

/* Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});
