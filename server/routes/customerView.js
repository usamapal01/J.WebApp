const express = require('express');
const conn = require('../database');
const router = express.Router();

router.get('/display-customer', (req, res) => {
  const sql = 'SELECT * FROM customer';
  conn.query(sql, (err, result) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching customers from database');
    } else {
      res.json(result);
    }
  });
});

// // get a single customer by id
// router.get('/customers/:id', (req, res) => {
//     const sql = `SELECT * FROM customer WHERE cust_id=${req.params.id}`;
//     conn.query(sql, (err, result) => {
//       if (err) {
//         console.error(err.message);
//         res.status(500).send(`Error fetching customer with id=${req.params.id} from database`);
//       } else {
//         res.json(result[0]);
//       }
//     });
//   });
  
  // update a customer by id
  router.put('/update-customer/:id', (req, res) => {
    const { first_name, last_name, email, phone_number, sale_notification, newstock_notification } = req.body;
    const sql = `UPDATE customer SET first_name='${first_name}', last_name='${last_name}', email='${email}', phone_number='${phone_number}', sale_notification=${sale_notification}, newstock_notification=${newstock_notification} WHERE cust_id=${req.params.id}`;
    conn.query(sql, (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(`Error updating customer with id=${req.params.id} in database`);
      } else {
        res.json(result);
      }
    });
  });
  
  // delete a customer by id
  router.delete('/delete-customer/:id', (req, res) => {
    const sql = `DELETE FROM customer WHERE cust_id=${req.params.id}`;
    conn.query(sql, (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(`Error deleting customer with id=${req.params.id} from database`);
      } else {
        res.json(result);
      }
    });
  });
  
  

module.exports = router;