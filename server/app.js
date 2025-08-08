// app.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Separate route for contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, whatsapp, budget, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are required' });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;

    const mailOptions = {
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}
 Email: ${email}
 ${whatsapp ? `WhatsApp: ${whatsapp}\n` : ''}${budget ? `Budget: ${budget}\n` : ''}Message:
 ${message}
 `,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-line">${message}</p>
      </div>`,
    };

    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    if (!info || !(info.accepted && info.accepted.length)) {
      console.error('SMTP rejected message:', info);
      return res.status(502).json({ ok: false, error: 'SMTP rejected the message' });
    }
    console.log('Email accepted by SMTP:', info.accepted, info.response);
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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;

    const mailOptions = {
      from: `"Footer Lead" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      ...(email ? { replyTo: email } : {}),
      subject: `New footer lead`,
      text: `${email ? `Email: ${email}\n` : ''}${whatsapp ? `WhatsApp: ${whatsapp}\n` : ''}Source: Footer`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ''}
        <p><em>Source: Footer</em></p>
      </div>`,
    };

    await transporter.sendMail(mailOptions);
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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;

    const mailOptions = {
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}Message:
${message}
`,
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-line">${message}</p>
      </div>`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true, message: 'Email sent' });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

app.get('/', (_req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
