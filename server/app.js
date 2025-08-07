// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// const ACCESS_TOKEN = 'YOUR_LONG_LIVED_TOKEN';
// const PHONE_NUMBER_ID = 'YOUR_PHONE_NUMBER_ID';
// const ADMIN_PHONE_NUMBER = 'RECIPIENT_NUMBER'; // In international format: 923xxxxxxxxx

app.post('/api/send-message', async (req, res) => {
  console.log("api is working");

  // Option 1: Simple response
  res.status(200).send('Message received');

  const { name, email, phone, message } = req.body;

  // const fullMessage = `🧑 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;

  // const response = await fetch(
  //   `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${ACCESS_TOKEN}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       messaging_product: 'whatsapp',
  //       to: ADMIN_PHONE_NUMBER,
  //       type: 'text',
  //       text: { body: fullMessage },
      // }),
    // }
  // );

  // const data = await response.json();
  // res.send(data);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
