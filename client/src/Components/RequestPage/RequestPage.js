import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RequestPage = () => {
  const [requestData, setRequestData] = useState({});

  let { request_id } = useParams();

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

  return (
    <div>
      <h2>Request {request_id}</h2>
      <p>Phone number: {requestData.phone_number}</p>
      <p>Request text: {requestData.request_text}</p>
      <p>Customer name: {requestData.first_name} {requestData.last_name}</p>
    </div>
  );
};

export default RequestPage;
