import React, { useState, useEffect } from "react";
import axios from "axios";

import "./ViewCustomer.css";

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
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
      .get("http://localhost:3001/display-customer")
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
    axios
      .put(`http://localhost:3001/update-customer/${id}`, editedCustomer)
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
      .delete(`http://localhost:3001/delete-customer/${id}`)
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

  return (
    <div>
      <h1>View Customers</h1>
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
              return (
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
                    <button onClick={() => handleDelete(customer.cust_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
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
                    <button onClick={() => handleDelete(customer.cust_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomer;
