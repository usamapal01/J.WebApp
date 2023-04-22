import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import { logout } from "../Login/authentication";

import "./CustomerForm.css";

const CustomerForm = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [saleNotifications, setSaleNotifications] = useState(1);
  const [stockNotifications, setStockNotifications] = useState(1);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isNavigatingAway, setIsNavigatingAway] = useState(false);

  //Option 1
  //this will prevent back button in the browser
  // useEffect(() => {
  //   const preventBackButton = (event) => {
  //     event.preventDefault();
  //     window.history.pushState(null, null, window.location.pathname);
  //   };

  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener("popstate", preventBackButton);

  //   return () => {
  //     window.removeEventListener("popstate", preventBackButton);
  //   };
  // }, []);

  //Option 2
  //Back button and changing url will take effect and log you out
  // Upon clicking back button it will take you to home page but log you out
  useEffect(() => {
    const preventBackButton = async (event) => {
      event.preventDefault();

      try {
        await logout();
      } catch (error) {
        setErrorMessage(error.message);
      }

      window.location.href = "/";
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", preventBackButton);

    return () => {
      window.removeEventListener("popstate", preventBackButton);
    };
  }, []);

  //part of option 2
  // if we try to change URL it will log me out and take me to home page
  useEffect(() => {
    if (isNavigatingAway) {
      const checkUrl = async () => {
        const currentUrl = window.location.href;
        const homepageUrl = "http://localhost:3000/";

        if (currentUrl !== homepageUrl) {
          try {
            await logout();
          } catch (error) {
            setErrorMessage(error.message);
          }

          window.location.href = "/";
        }
      };

      checkUrl();
    }
  }, [isNavigatingAway]);

  //part of option 2
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsNavigatingAway(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
      <h3>Customer Details</h3>
      <form onSubmit={handleSubmit}>
        <MDBInput
          className="mb-4"
          type="text"
          id="form1Example1"
          label="First Name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          labelStyle={{ paddingTop: "calc(1% - 20px)" }}
        />
        <MDBInput
          className="mb-4"
          type="text"
          id="form1Example1"
          label="Last Name"
          value={last}
          onChange={(e) => setLast(e.target.value)}
          labelStyle={{ paddingTop: "calc(1% - 20px)" }}
        />
        <MDBInput
          className="mb-4"
          type="email"
          id="form1Example1"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          labelStyle={{ paddingTop: "calc(1% - 20px)" }}
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
            // className="mb-1"
            type="text"
            label="Phone Number"
            style={{ paddingLeft: "30px", paddingTop: "8px" }}
            value={phone}
            onChange={(e) => {
              if (e.target.value.length > 10) return;
              setPhone(e.target.value.replace(/\D/g, ""));
            }}
            labelStyle={{ paddingTop: "calc(1% - 20px)" }}
          />
        </div>

        <MDBRow className="mb-4 checkbox">
          <div style={{ display: "flex", alignItems: "center" }}>
            <MDBCheckbox
              defaultChecked={saleNotifications}
              onChange={() => setSaleNotifications(!saleNotifications)}
            />
            <span style={{ marginLeft: "10px" }}>Sale Notifications</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MDBCheckbox
              defaultChecked={stockNotifications}
              onChange={() => setStockNotifications(!stockNotifications)}
            />
            <span style={{ marginLeft: "10px" }}>
              New Arrival Notifications
            </span>
          </div>
        </MDBRow>
        {error && <div className="error">{error}</div>}
        <MDBBtn className="submit-button" type="submit">
          Submit
        </MDBBtn>
      </form>
    </div>
  );
};

export default CustomerForm;
