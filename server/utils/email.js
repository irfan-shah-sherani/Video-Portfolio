const nodemailer = require('nodemailer');

function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD must be set');
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

async function sendEmail({ subject, to, html, text, replyTo }) {
  const transporter = createTransporter();

  const from = `"Trimzo Portal" <${process.env.GMAIL_USER}>`;
  const mailOptions = {
    from,
    to: to || process.env.TO_EMAIL || process.env.GMAIL_USER,
    subject,
    html,
    text,
    replyTo,
  };

  // verify once to ensure connectivity
  try {
    await transporter.verify();
  } catch (e) {
    // continue; some envs may not support verify
  }
  const info = await transporter.sendMail(mailOptions);
  return info;
}

module.exports = {
  sendEmail,
};