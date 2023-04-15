import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect to the customer page or set a session cookie
        history.push("/display-customer");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while logging in");
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
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <div>
                <p className="mb-0">
                  Navigating to Customer Page?{" "}
                  <a href="/customer" class="text-white-50 fw-bold">
                    Click here
                  </a>
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
