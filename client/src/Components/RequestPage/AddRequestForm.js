import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./AddRequestForm.css";

const AddRequestForm = () => {
  const [phone_number, setPhoneNumber] = useState("+1");
  const [request_text, setRequestText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("I am in handle submit");
    try {
      const response = await axios.post("http://localhost:3001/add-request", {
        phone_number,
        request_text,
      });
      alert("Request added successfully");
      // onAddRequest(response.data);
      setPhoneNumber("");
      setRequestText("");
    } catch (err) {
      console.error(err);
      alert("Failed to add request");
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <form onSubmit={handleSubmit} className="add-request-form">
        <label>
          Phone number:
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="add-request-input"
          />
        </label>
        <br />
        <label>
          Request:
          <textarea
            className="add-request-input request-text-input"
            type="text"
            value={request_text}
            onChange={(e) => setRequestText(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="add-request-button">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddRequestForm;
