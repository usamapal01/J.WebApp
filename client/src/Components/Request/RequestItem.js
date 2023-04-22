import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import Card from "./Card";
import "./RequestItem.css";

const RequestItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
      <Link to={`/${props.request_id}/user-request`}>  {/*this would have a different link for every user */}
        <div className="user-item__info">
          <h1>Request Id: {props.request_id}</h1>
          <h1>Date: {moment(props.date_created).format("MMMM D, YY")}</h1>
          <h1>Time: {moment(props.time_created, "HH:mm:ss").format("hh:mm A")}</h1>
          <h2>
            Full Name: {props.first_name} {props.last_name}
          </h2>
          <h2>{`+1 (${props.phone_number.slice(2, 5)}) ${props.phone_number.slice(
            5,
            8
          )}-${props.phone_number.slice(8)}`}</h2>
          <h3>Request: {props.request_text}</h3>
        </div>
        </Link>
      </Card>
    </li>
  );
};

export default RequestItem;
