import React from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import "./RequestItem.css";

const RequestItem = (props) => {
  

  return (
    <li className="user-item">

      <Card className="user-item__content">
         <Link to={`/${props.request_id}/user-request`}>  {/*this would have a different link for every user */}
          <div className="user-item__info">
            <h1>Request Id:{props.request_id}</h1>
            <h1>Customer Id:{props.cust_id}</h1>
            <h2>First Name: {props.first_name}</h2>
            <h2>Last Name: {props.last_name}</h2>
            <h2>{props.phone_number}</h2>
            <h3>
              Requests: {props.request_text}
            </h3>
          </div>
        </Link>
        </Card>
      
    </li>
  );
};

export default RequestItem;
