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
router.post('/send-bulk-message', (req, res) => {
  const { to, body } = req.body;
  let result = [];
  let error = [];
  for (let number in to) {
    console.log(number);
    setTimeout(() => {

      client.messages
        .create({
          body,
          from: twilioPhoneNumber,
          to: to[number]
        })
        .then(() => {
          console.log('Message sent successfully!');
          // result = [...result, number];
        })
        .catch((err) => {
          console.error(err);
          // error = [...error, number];

        });
    }, 100 + (number * 100)); // 100 milliseconds gap between send and receive
  }
  res.send({ success: true });


});

module.exports = router;
