import React, { useState, useEffect } from "react";
import axios from "axios";

import "./ViewCustomer.css";
import BulkSmsPopup from "./BulkSmsPopup";
import Navbar from "../Navbar/Navbar";
import { serverURL } from "../../App";

const ViewCustomer = () => {
  const [smsPopup, setSmsPopup] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [error, setError] = useState("")
  const [editedCustomer, setEditedCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    sale_notification: false,
    newstock_notification: false,
  });

  useEffect(() => {
    axios
      .get(`${serverURL}/display-customer`)
      .then((res) => {
        console.log(res.data); // added this line
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleEdit = (id, customer) => {
    setEditingCustomerId(id);
    setEditedCustomer(customer);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: newValue,
    }));
  };

  const handleSave = (id) => {
    if (!editedCustomer.first_name || !editedCustomer.last_name || editedCustomer.phone_number.length !== 12) {
      setError("Please fill out all fields")
      return;
    }
    axios
      .put(`${serverURL}/update-customer/${id}`, editedCustomer)
      .then((res) => {
        console.log(res);
        setEditingCustomerId(null);
        setEditedCustomer({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          sale_notification: false,
          newstock_notification: false,
        });
        setError("")
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.cust_id === id
              ? { ...customer, ...editedCustomer }
              : customer
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    setError("")
    setEditingCustomerId(null);
    setEditedCustomer({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      sale_notification: false,
      newstock_notification: false,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${serverURL}/delete-customer/${id}`)
      .then((res) => {
        console.log(res);
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.cust_id !== id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleSmsPopup = () => setSmsPopup(prev => !prev)
  return (
    <div >
    <Navbar />
      <div className="flex">

        <h1>View Customers</h1>
        <button className="bulkSMS-button" type="button" onClick={handleSmsPopup}> Bulk SMS</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Sale Notifications</th>
            <th>Stock Notifications</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            if (customer.cust_id === editingCustomerId) {
              return (<>
                <tr key={customer.cust_id}>
                  <td>{customer.cust_id}</td>
                  <td>
                    <input
                      type="text"
                      name="first_name"
                      value={editedCustomer.first_name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="last_name"
                      value={editedCustomer.last_name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editedCustomer.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="tel"
                      name="phone_number"
                      value={editedCustomer.phone_number}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="sale_notification"
                      checked={editedCustomer.sale_notification}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="newstock_notification"
                      checked={editedCustomer.newstock_notification}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(customer.cust_id)}>
                      Save
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(customer.cust_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
                {error ? <tr>
                  <td colSpan={9} className="error">{error}</td>
                </tr> : ""}
              </>
              );
            } else {
              return (
                <tr key={customer.cust_id}>
                  <td>{customer.cust_id}</td>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.sale_notification ? "Yes" : "No"}</td>
                  <td>{customer.newstock_notification ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(customer.cust_id, customer)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(customer.cust_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      {smsPopup ? <BulkSmsPopup customers={customers} onClose={handleSmsPopup} /> : ""}
    </div>
  );
};

export default ViewCustomer;
