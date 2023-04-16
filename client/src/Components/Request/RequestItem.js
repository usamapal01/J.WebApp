import React from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import "./RequestItem.css";

const RequestItem = (props) => {

  // const handleDelete = () => {
  //   console.log("Delete");
  // };
  

  return (
    <li className="user-item">

      <Card className="user-item__content">
         <Link to={`/${props.request_id}/user-request`}>  {/*this would have a different link for every user */}
          <div className="user-item__info">
            <h1>Req Id:{props.request_id}</h1>
            <h1>Customer Id:{props.cust_id}</h1>
            <h2>Name: {props.first_name} {props.last_name}</h2>
            {/* <h2>Last Name: {props.last_name}</h2> */}
            <h2>{`+1 (${props.phone_number.slice(2,5)}) ${props.phone_number.slice(5,8)}-${props.phone_number.slice(8)}`}</h2>
            <h3>
              Requests: {props.request_text}
            </h3>
            {/* <button onClick={handleDelete}>Delete</button> */}
          </div>
        </Link>
        </Card>
      
    </li>
  );
};

export default RequestItem;
