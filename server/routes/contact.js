const express = require('express');
const { sendEmail } = require('../utils/email');
const { requireAuth, requireVerified } = require('../middleware/auth');

const router = express.Router();
  

// POST /api/contact (open to public)
router.post('/contact', async (req, res) => {
  const { name, email, whatsapp, budget, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email and message are required' });
  }
  try {
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
    console.error('Contact send error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});

// POST /api/subscribe
router.post('/subscribe', async (req, res) => {
  const { email, whatsapp } = req.body ;
  if (!email && !whatsapp) {
    return res.status(400).json({ ok: false, error: 'email or whatsapp is required' });
  }
    const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;
    const subject = 'New footer lead';
    const text = `${email ? `Email: ${email}\n` : ''}${whatsapp ? `WhatsApp: ${whatsapp}\n` : ''}Source: Footer`;
    const  html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ''}
      <p><em>Source: Footer</em></p>
    </div>`;

    await sendEmail({ subject, to: toEmail, html, text, replyTo: email });
    return res.status(200).json({ ok: true, message: 'Lead email sent' });
});

// POST /api/send-message
// router.post('/send-message', async (req, res) => {
//   const { name, email, phone, message } = req.body || {};
//   if (!name || !email || !message) {
//     return res.status(400).json({ ok: false, error: 'name, email and message are required' });
//   }
//   try {
//     const toEmail = process.env.TO_EMAIL || process.env.GMAIL_USER;
//     const subject = `New contact form message from ${name}`;
//     const text = `Name: ${name}
// Email: ${email}
// ${phone ? `Phone: ${phone}\n` : ''}Message:
// ${message}
// `;
//     const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
//       <p><strong>Message:</strong></p>
//       <p style="white-space:pre-line">${message}</p>
//     </div>`;

//     await sendEmail({ subject, to: toEmail, html, text, replyTo: email });
//     return res.status(200).json({ ok: true, message: 'Email sent' });
//   } catch (err) {
//     console.error('Email send error:', err);
//     return res.status(500).json({ ok: false, error: 'Failed to send email' });
//   }
// });

module.exports = router;