import axios from "axios";
import React, { useState } from "react";

const BulkSmsPopup = ({ customers, onClose }) => {
  const [data, setData] = useState({ type: "sale_notification", message: "" });


  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/send-bulk-message", {
        to: customers
          .filter((a) => a[data.type]) // a is respoinsible for either sale noti or stock noti
          .map((customer) => customer.phone_number), // only map those values which are true
        body: data.message,
      })
      .then((response) => {
        console.log(response.data);
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="overlay">
      <div className="popup">
        <h2>BulkSmsPopup</h2>
        <button onClick={onClose} className="close_btn">
          X
        </button>
        <form onSubmit={handleSendMessage}>
          <label htmlFor="subject" className="flex">
            Type
            <select
              type="text"
              name="type"
              id="type"
              value={data.type}
              onChange={onChangeHandler}
            >
              <option value="sale_notification">Sale Notification</option>
              <option value="newstock_notification">Stock Notification</option>
            </select>
          </label>
          <label
            htmlFor="message"
            className="flex"
            value={data.message}
            onChange={onChangeHandler}
          >
            Message
            <textarea name="message" id="message" cols="20" rows="5"></textarea>
          </label>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkSmsPopup;
