import React, { useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { } from "react-router-dom";
import { logout } from "../actions/userActions";

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => { }, [userInfo]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">MAGESTORE</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{ justifyContent: 'flex-end' }}>
          <Nav>
            {userInfo ? (
              <>
                {/* <Nav.Link href="/flashsale">Flash Sale</Nav.Link> */}
                <NavDropdown
                  title={`Hi, ${userInfo.name}`}
                  id="collasible-nav-dropdown"
                  style={{ justifyContent: 'flex-end' }}
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
