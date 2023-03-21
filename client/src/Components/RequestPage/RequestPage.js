import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// import './RequestPage.css';

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
      <h1>Request {requestData.request_id}</h1>
      <p><b>Customer ID:</b> {requestData.cust_id}</p>
      <p><b>Customer name:</b> {requestData.first_name} {requestData.last_name}</p>
      <p><b>Phone number:</b> {requestData.phone_number}</p>
      <p><b>Request text:</b> {requestData.request_text}</p>
    </div>

    //Code sent by Andreas
    // <div className="page">
    //   <div className="row">
    //     <div className="column">
    //       <h2 className="Customer_ID_label"> Customer ID </h2>
    //       <h3 className="value">{requestData.cust_id} </h3>
    //     </div>
    //     <div className="column">
    //       <h2 className="Request_ID_label"> Request ID </h2>
    //       <h3 className="value">{requestData.request_id} </h3>
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="column">
    //       <h2 className="First_name_label"> First Name </h2>
    //       <h3 className="value">{requestData.first_name} </h3>
    //     </div>
    //     <div className="column">
    //       <h2 className="Last_name_label"> Last Name </h2>
    //       <h3 className="value">{requestData.last_name} </h3>
    //     </div>
    //   </div>

    //   <div className="column">
    //     <h2 className="Phone_number_label"> Phone Number </h2>
    //     <h3 className="value">{requestData.phone_number} </h3>
    //   </div>
    //   <div className="spacer" />

    //   <div className="Request_data_div">
    //     <h4>{requestData.request_text}</h4>
    //   </div>

    //   <div className="spacer" />

    //   <div className="textarea_div ">
    //     <div className="column">
    //       <textarea className="textarea" />
    //       <br/>
    //       <button className="submit_button"> SUBMIT </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RequestPage;
