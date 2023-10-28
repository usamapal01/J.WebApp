import React, { useEffect, useState } from "react";
import RequestList from "./RequestList";
// import AddRequestForm from "../RequestPage/AddRequestForm";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`${serverURL}/customer-requests`).then((response) => {
    console.log(response.data);  
    setRequests(response.data);
    })
    .catch((err) => {
        console.error(err);
      });
  }, []);

//   const handleAddRequest = (newRequest) => {
//     setRequests([...requests, newRequest]);
//   };

//   const handleDeleteRequest = async (id) => {
//     try {
//       await axios.delete(`serverURL/customer-requests/${id}`);
//       setRequests(requests.filter((request) => request.request_id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

  return (
    <div>
    <Navbar />
      {/* <AddRequestForm onAddRequest={handleAddRequest} /> */}
      <RequestList items={requests} />
      {/* <RequestList items={requests} onDeleteRequest={handleDeleteRequest} /> */}
    </div>
  );
};

export default Requests;