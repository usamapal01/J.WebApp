import React, {useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Navbar";
import { logout, isAuthenticated } from '../Login/authentication';
import { useHistory } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 10px 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 24px;
  color: grey;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-right: 20px;
  color: #333333;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s;

  &:hover {
    color: #4d4dff;
  }
`;

const LogoutLink = styled(NavLink)`
  color: #B8860B;
`;

const Navbar = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/");
      window.location.reload(false); // reload the page
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Nav>
      <Logo>J. Customer Portal</Logo>
      <Links>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/customer">Add Customer</NavLink>
        <NavLink to="/display-customer">View Customers</NavLink>
        <NavLink to="/customer-requests">Requests</NavLink>
        <NavLink to="/add-request">Add Request</NavLink>
        {isAuthenticated() && (
          <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
        )}
      </Links>
      {errorMessage && (
        <span className="text-danger ms-2">{errorMessage}</span>
      )}
    </Nav>
  );
};

export default Navbar;
