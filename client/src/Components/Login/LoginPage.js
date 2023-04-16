import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "./LoginPage.css";
import logo from "../../img/logo.png";
import { login } from "./authentication";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      history.push("/customer-requests");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <MDBContainer fluid className="m-0 p-5 loginBody">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <img
              src={logo}
              alt="logo"
              width={250}
              height={250}
              style={{ alignSelf: "center" }}
            />
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
              // className="form-label"
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email Address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                labelStyle={{ paddingTop: '0.1rem', paddingLeft: '0.1rem' }}
              />

              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                labelStyle={{ paddingTop: '0.1rem' }}
              />

              <p className="small mb-3 pb-lg-2">
                <a class="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>
              <MDBBtn
                outline
                className="mx-2 px-5"
                color="white"
                size="lg"
                onClick={handleSubmit}
              >
                Login
                {errorMessage && (
                  <span className="text-danger ms-2">{errorMessage}</span>
                )}
              </MDBBtn>

              {/* or use Link from react-router-dom 
                  but it doesnt makes sense to implement it here */}
              <div>
                <p className="mb-0">
                  Navigating to Customer Page?{" "}
                  <Link to="/customer" class="text-white-50 fw-bold">
                    Click here
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;
