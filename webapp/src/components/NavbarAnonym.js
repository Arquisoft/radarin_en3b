import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";
import Navbar from "react-bootstrap/Navbar";
import { NavbarItems } from "./NavbarItems";
import NavLink from "react-bootstrap/NavLink";
import Logo from "../img/radarin_logo.png";

export default function NavbarAnonym() {
    return (
        <Navbar bg="white" expand="lg" className="navBar fixed-top align-items center shadow rounded">
            <Navbar.Brand as={Link} to="/" className="mb-1">
                <img src={Logo} alt="Radarin Logo"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {NavbarItems.filter((element) => !element.key.includes("locations")).map((item, index) => {
                        return (
                            <NavLink key={item.key} className={item.cName} as={Link} to={item.url}>
                                {item.title}
                            </NavLink>
                        )
                    })}
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