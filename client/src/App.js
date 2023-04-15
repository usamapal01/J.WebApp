import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./index.css";
import PrivateRoute from './Components/PrivateRoute';

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
        <Route path="/" exact>
        <Navbar />
          <LoginPage />
          <Footer />
        </Route>
        {/* Private route for customerForm page */}
        <PrivateRoute path="/customer" exact component={CustomerForm} />
        {/* use below code if authentication is not needed for CustomerForm page */}
        {/* <Route path="/customer" exact>
          <CustomerForm />
        </Route> */}
        <PrivateRoute path="/display-customer" exact component={ViewCustomer} />
        <PrivateRoute path="/customer-requests" exact component={Requests} />
        <PrivateRoute path="/:request_id/user-request" exact component={RequestPage} />
        <PrivateRoute path="/add-request" exact component={AddRequestForm} />
        <Redirect to="/" />
        {/*if anything else is enter it will direct to loginpage(home route) */}
      </Switch>
    </Router>
  );
}

export default App;
