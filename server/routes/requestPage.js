// This code is resposible for getting data to individual request page.
// Used WHERE clause

const express = require("express");
const conn = require("../database");
const router = express.Router();

router.get("/:request_id/user-request", (req, res) => {
  const request_id = req.params.request_id; //will hold request id
  const sql = `SELECT r.request_id, r.phone_number,r.title,c.first_name,c.last_name,c.cust_id, r.date_created, r.time_created, r.note, r.status
               FROM customer_request r INNER JOIN customer c 
               ON r.phone_number = c.phone_number 
               WHERE r.request_id = ?`;
  conn.query(sql, [request_id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error fetching request from database");
    } else if (result.length === 0) {
      res.status(404).send("Request not found");
    } else {
      res.json(result[0]);
    }
  });
});

// resposible for deleting request from individual requestpage
router.delete("/:request_id/user-request", (req, res) => {
  const request_id = req.params.request_id;
  const sql = "DELETE FROM customer_request WHERE request_id = ?";
  conn.query(sql, [request_id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error deleting request from database");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Request not found");
    } else {
      res.sendStatus(204); // No Content
    }
  });
});

// responsible for updating the completion status of a request
router.put("/:request_id/user-request", (req, res) => {
  const request_id = req.params.request_id;
  const status = req.body.status;

  const sql = "UPDATE customer_request SET status = ? WHERE request_id = ?";
  conn.query(sql, [status, request_id], (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Error updating request status in database");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Request not found");
    } else {
      res.send("Request status updated successfully");
    }
  });
});

module.exports = router;
