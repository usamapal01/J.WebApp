const express = require("express");
const router = express.Router();


require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

router.post('/send-message', (req, res) => {
    const { to, body } = req.body;
  
    client.messages
      .create({
        body,
        from: twilioPhoneNumber,
        to
      })
      .then(() => {
        res.send('Message sent successfully!');
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error sending message.');
      });
  });

  module.exports = router;
