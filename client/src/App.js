import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./index.css";

import LoginPage from "./Components/Login/LoginPage";
import CustomerForm from "./Components/Customer/CustomerForm";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import ViewCustomer from "./Components/Customer/ViewCustomer";
import Requests from "./Components/Request/Requests";
import RequestPage from "./Components/RequestPage/RequestPage";
import AddRequestForm from "./Components/RequestPage/AddRequestForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/customer" exact>
          <CustomerForm />
        </Route>
        <Route path="/display-customer" exact>
          <Navbar />
          <ViewCustomer />
        </Route>
        <Route path="/customer-requests" exact>
        <Navbar/>
          <Requests />
          <Footer />
        </Route>
        <Route path="/:request_id/user-request" exact>
        <Navbar/>
          <RequestPage />
        </Route>
        <Route path="/add-request" exact>
          <Navbar />
          <AddRequestForm />
        </Route>
        <Route path="/" exact>
          <Navbar />
          <LoginPage />
          <Footer />
        </Route>

        <Redirect to="/" />
        {/*if anything else is enter it will direct to loginpage(home route) */}
      </Switch>
    </Router>
  );
}

export default App;
