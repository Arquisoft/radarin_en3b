import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarSession from "./NavbarSession.js";
import { Link } from "react-router-dom";

function MainNavbar() {
    return <Navbar bg="white" expand="lg" className="navBar fixed-top align-items center shadow rounded">
        <Navbar.Brand as={Link} to="/" className="mb-1">Radarin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/locations" >Locations</Nav.Link>
                <Nav.Link as={Link} to="/about" >About</Nav.Link>
            </Nav>
        <NavbarSession></NavbarSession>    
        </Navbar.Collapse>
    </Navbar>;
}
export default MainNavbar;