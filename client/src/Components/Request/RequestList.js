import React from "react";

import RequestItem from "./RequestItem";
import Card from "./Card";
import "./RequestList.css";

const RequestList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No requests found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {/* shorter way of returning component  */}
      {props.items.map((request) => (
        <RequestItem
          key={request.id}
          request_id={request.request_id}
          cust_id={request.cust_id}
          first_name={request.first_name}
          last_name={request.last_name}
          title={request.title}
          phone_number={request.phone_number}
          date_created={request.date_created}
          time_created={request.time_created}
        />
      ))}
    </ul>
  );
};

export default RequestList;
