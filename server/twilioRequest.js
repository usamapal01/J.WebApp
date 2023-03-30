const express = require("express");
const router = express.Router();


const accountSid = 'YOUR_ACCOUNT_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);

router.post('/send-message', (req, res) => {
    const { to, body } = req.body;
  
    client.messages
      .create({
        body,
        from: 'your_twilio_phone_number',
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
