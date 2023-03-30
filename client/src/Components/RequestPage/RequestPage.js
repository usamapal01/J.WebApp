import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

// import './RequestPage.css';

const RequestPage = () => {
  const [requestData, setRequestData] = useState({});
  const { request_id } = useParams();
  const history = useHistory();

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

  return (
    <div>
      <div>
        <h1>Request {requestData.request_id}</h1>
        <p>
          <b>Customer ID:</b> {requestData.cust_id}
        </p>
        <p>
          <b>Customer name:</b> {requestData.first_name} {requestData.last_name}
        </p>
        <p>
          <b>Phone number:</b> {requestData.phone_number}
        </p>
        <p>
          <b>Request text:</b> {requestData.request_text}
        </p>
      </div>
      <div>
        <button onClick={handleDeleteRequest}>Delete Request</button>
      </div>
    </div>
  );
};

export default RequestPage;
