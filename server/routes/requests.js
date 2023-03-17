const express = require("express");
const conn = require("../database");
const router = express.Router();


//not to be used
// router.get("/customer-requests", async (req, res) => {
//     try {
//       const requests = await conn.query(`
//         SELECT 
//           r.request_id,
//           r.phone_number,
//           r.request_text,
//           c.first_name,
//           c.last_name,
//           c.cust_id
//         FROM 
//           customer_request r
//           INNER JOIN customer c ON r.phone_number = c.phone_number
//       `);
//       res.json(requests.rows); //(result.rows)
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   });

router.get('/customer-requests', (req, res) => {
  const sql = 'SELECT r.request_id, r.phone_number,r.request_text,c.first_name,c.last_name,c.cust_id FROM customer_request r INNER JOIN customer c ON r.phone_number = c.phone_number';
  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching customers from database');
    } else {
      res.json(result);
    }
  });
});



// router.post("/customer-requests", (req, res) => {
//     try {
//       const { phone_number, request_text } = req.body;
//       const newRequest = conn.query(
//         "INSERT INTO customer_request (phone_number, request_text) VALUES ($1, $2) RETURNING *",
//         [phone_number, request_text]
//       );
//       res.json(newRequest.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   });

//   router.delete("/customer-requests/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deletedRequest = await conn.query(
//         "DELETE FROM customer_request WHERE request_id = $1 RETURNING *",
//         [id]
//       );
//       res.json(deletedRequest.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   });

//   router.post("/customer-requests", async (req, res) => {
//     try {
//       const { phone_number, request_text } = req.body;
//       const newRequest = await conn.query(`
//         INSERT INTO customer_request (phone_number, request_text) 
//         SELECT $1, $2
//         WHERE EXISTS (
//           SELECT 1 FROM customer WHERE phone_number = $1
//         )
//         RETURNING *
//       `, [phone_number, request_text]);
//       res.json(newRequest.rows[0]);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   });

module.exports = router;