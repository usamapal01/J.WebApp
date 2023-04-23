const express = require("express");
const conn = require("../database");
const router = express.Router();


router.post("/add-request", async (req, res) => {
    try {
      const { phone_number, note, date_created, time_created, title } = req.body;
      const newRequest = await conn.promise().execute(
        "INSERT INTO customer_request (phone_number, note, date_created, time_created, title) VALUES (?, ?, ?, ?, ?)",
        [phone_number, note, date_created, time_created, title]
      );
      res.json({ message: "Request added successfully." });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;