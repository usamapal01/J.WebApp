// This code is resposible for getting data to individual request page. 
// Used WHERE clause

const express = require('express');
const conn = require('../database');
const router = express.Router();

router.get('/:request_id/user-request', (req, res) => {
  const request_id = req.params.request_id; //will hold request id
  const sql = `SELECT r.request_id, r.phone_number,r.request_text,c.first_name,c.last_name,c.cust_id 
               FROM customer_request r INNER JOIN customer c 
               ON r.phone_number = c.phone_number 
               WHERE r.request_id = ?`;
  conn.query(sql, [request_id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching request from database');
    } else if (result.length === 0) {
      res.status(404).send('Request not found');
    } else {
      res.json(result[0]);
    }
  });
});

module.exports = router;
