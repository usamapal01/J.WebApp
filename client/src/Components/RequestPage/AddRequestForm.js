import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./AddRequestForm.css";

const AddRequestForm = () => {
  const [phone_number, setPhoneNumber] = useState("+1");
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //get current date and time
    const now = new Date();
    let date_created = now.toJSON().slice(0, 10);
    let time_created =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0") +
      ":" +
      now.getSeconds().toString().padStart(2, "0");

    console.log("I am in handle submit");
    try {
      const response = await axios.post("http://localhost:3001/add-request", {
        phone_number,
        note,
        date_created,
        time_created,
        title,
      });
      alert("Request added successfully");
      // onAddRequest(response.data);
      setPhoneNumber("");
      setNote("");
      setTitle("");
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
          Request Title:
          <input
            className="add-request-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Request Note:
          <textarea
            className="add-request-input request-text-input"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
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
