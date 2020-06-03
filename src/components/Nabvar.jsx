import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";

export default function Nabvar() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  const SignOut = async () => {
    await firebase.auth().signOut();
  };
  return (
    <Fragment>
      <Navbar bg="dark" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand className="text-white" href="/">
            Base de datos Pozos
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link >
                <Link className="text-white" to="/">Home</Link>
              </Nav.Link>
            </Nav>
            <Nav inline>
              {auth.isEmpty ? (
                <Link to="/login">
                  <Nav.Link className="text-white">login</Nav.Link>
                </Link>
              ) : (
                <Nav.Link onClick={SignOut} className="text-white">
                  Cerrar Sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}
