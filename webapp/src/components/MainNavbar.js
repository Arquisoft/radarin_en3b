import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarSession from "./NavbarSession.js";
import { Link } from "react-router-dom";
import '../css/MainNavbar.css';
import { NavbarItems } from "./NavbarItems";
import Logo from "../img/radarin_logo.png";
import NavLink from "react-bootstrap/NavLink";

function MainNavbar() {
    return <Navbar bg="white" expand="lg" className="navBar fixed-top align-items center shadow rounded">
        <Navbar.Brand as={Link} to="/" className="mb-1">
            <img src={Logo} alt="Radarin Logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                {NavbarItems.map((item, index) => {
                    return (
                        <NavLink className={item.cName} as={Link} exact={true} to={item.url} activeClassName='main-nav-active'>
                            {item.title}
                        </NavLink>
                    )
                })}
            </Nav>
        <NavbarSession></NavbarSession>    
        </Navbar.Collapse>
    </Navbar>;
}
export default MainNavbar;