const express = require('express');
const conn = require('../database');
const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  conn.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while logging in' });
      return;
    }
    if (result.length > 0) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
});

module.exports = router;
