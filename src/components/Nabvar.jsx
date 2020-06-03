import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function Nabvar() {
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Base de datos Pozos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link> <Link to="/" > Home </Link></Nav.Link>
            <Nav.Link> <Link to="/login" > login </Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
}
