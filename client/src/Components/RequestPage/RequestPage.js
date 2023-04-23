import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Navbar from "../Navbar/Navbar";
import "./RequestPage.css";

const RequestPage = () => {
  const [requestData, setRequestData] = useState({});
  const { request_id } = useParams(); // parameter
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/${request_id}/user-request`)
      .then((response) => {
        setRequestData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [request_id]);

  const handleDeleteRequest = () => {
    axios
      .delete(`http://localhost:3001/${request_id}/user-request`)
      .then(() => {
        // Redirect to previous page
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSendMessage = () => {
    axios
      .post("http://localhost:3001/send-message", {
        to: requestData.phone_number,
        body: message,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleStatusChange = () => {
    axios
      .put(`http://localhost:3001/${request_id}/update-status`, {
        status: !status,
      })
      .then((response) => {
        setStatus(!status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // this function will implement the autogenerated msg
  const handleAutoGenerate = () => {
    const generatedMessage = `Dear Customer, your request for "${requestData.title}" has been completed. Please visit our local store or visit our website.`;
    setMessage(generatedMessage);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="request-page">
        <div className="request-details">
          <div className="row">
            <h1 className="column heading">
              Request # {requestData.request_id}
            </h1>
            <div className="column date-time">
              <div>
                Date: {moment(requestData.date_created).format("MMMM D, YYYY")}
              </div>
              <div>
                Time:{" "}
                {moment(requestData.time_created, "HH:mm:ss").format("hh:mm A")}
              </div>{" "}
            </div>
          </div>
          <p>
            <b>Customer ID:</b> {requestData.cust_id}
          </p>
          <p>
            <b>Customer name:</b> {requestData.first_name}{" "}
            {requestData.last_name}
          </p>
          <p>
            <b>Phone number:</b> {requestData.phone_number}
          </p>
          <p>
            <b>Request title:</b> {requestData.title}
          </p>
          <p>
            <b>Request Note:</b> {requestData.note}
          </p>
          <p>
            <b>Request Completion Status:</b> {requestData.status}
          </p>
        </div>
        <div className="send-message">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            className="message-input"
          />
          <div className="button-group">
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
            <button
              onClick={handleAutoGenerate}
              className="auto-generate-button"
            >
              Auto Generate
            </button>
          </div>
        </div>
        <div className="delete-request">
          <button onClick={handleDeleteRequest} className="delete-button">
            Delete Request
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RequestPage;
