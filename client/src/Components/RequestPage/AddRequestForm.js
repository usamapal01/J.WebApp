import React, { useState } from "react";
import axios from "axios";

const AddRequestForm = ({ onAddRequest }) => {
  const [phone_number, setPhoneNumber] = useState("+1");
  const [request_text, setRequestText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/customer-requests", {
        phone_number,
        request_text,
      });
      alert("Request to add fail");
      onAddRequest(response.data);
      setPhoneNumber("");
      setRequestText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone number:
        <input
          type="text"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Request:
        <input
          type="text"
          value={request_text}
          onChange={(e) => setRequestText(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddRequestForm;
