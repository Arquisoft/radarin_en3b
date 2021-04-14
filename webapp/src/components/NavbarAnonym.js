import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarAnonym() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar bg="white" expand="lg" className="navBar fixed-top align-items center shadow rounded">
            <Navbar.Brand as={Link} to="/" className="mb-1">Radarin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggle}/>
            <Navbar.Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/about" >About</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/login" className="mr-3">
                        <Button color="primary" variant="contained" id="SignInButton">Sign In</Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}