import React, { useState } from "react";
import axios from "axios";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";

import "./CustomerForm.css";

const CustomerForm = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saleNotifications, setSaleNotifications] = useState(1);
  const [stockNotifications, setStockNotifications] = useState(1);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first || !last || phone.length !== 10) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const saleNotificationsValue = saleNotifications ? 1 : 0;
      const stockNotificationsValue = stockNotifications ? 1 : 0;
      await axios.post("http://localhost:3001/customer", {
        first,
        last,
        email,
        phone: `+1${phone}`,
        saleNotifications: saleNotificationsValue,
        stockNotifications: stockNotificationsValue,
      });
      alert("Customer added successfully");
      handleWelcomeMessage();
    } catch (error) {
      console.error(error);
      alert("Failed to add customer");
    }
  };

  // notification sms for new customer
  const handleWelcomeMessage = () => {
    axios
      .post("http://localhost:3001/welcome-message", {
        to: phone,
        first_name: first,
        last_name: last,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-body">
      <h3>Please enter your details</h3>
      <form onSubmit={handleSubmit}>
        <MDBInput
          className="mb-4"
          type="text"
          id="form1Example1"
          label="First Name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        <MDBInput
          className="mb-4"
          type="text"
          id="form1Example1"
          label="Last Name"
          value={last}
          onChange={(e) => setLast(e.target.value)}
        />
        <MDBInput
          className="mb-4"
          type="email"
          id="form1Example1"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
          }}
        >
          {phone ? (
            <span style={{ position: "absolute", left: "10px" }}>+1</span>
          ) : (
            ""
          )}
          <MDBInput
            className="mb-1"
            type="text"
            label="Phone Number"
            style={{ paddingLeft: "30px", paddingTop: "8px" }}
            value={phone}
            onChange={(e) => {
              if (e.target.value.length > 11) return;
              setPhone(e.target.value.replace(/\D/g, ""));
            }}
          />
        </div>

        <MDBRow className="mb-6 checkbox">
          <MDBCheckbox
            label="Sale Notifications"
            defaultChecked={saleNotifications}
            onChange={() => setSaleNotifications(!saleNotifications)}
          />
          <MDBCheckbox
            label="New stock Notifications"
            defaultChecked={stockNotifications}
            onChange={() => setStockNotifications(!stockNotifications)}
          />
        </MDBRow>
        {error && <div className="error">{error}</div>}
        <MDBBtn type="submit" block>
          Submit
        </MDBBtn>
      </form>
    </div>
  );
};

export default CustomerForm;
