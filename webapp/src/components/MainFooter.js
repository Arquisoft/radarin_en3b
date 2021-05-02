import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/Footer.css";
import { FooterItems } from "./FooterItems";
import NavLink from "react-bootstrap/NavLink";
import Logo from "../img/radarin_logo.png";

export default function MainFooter() {
    return <footer className="footer">
        <div className="lightBg">
            <div className="d-flex align-items-center justify-content-center">
                <Navbar expand="lg">
                    <Navbar.Brand href="#home" className="mx-5">
                        <img src={Logo} alt="Radarin Logo"></img>
                    </Navbar.Brand>
                </Navbar>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <Navbar expand="lg">
                    {FooterItems.map((item) => {
                        return (
                            <NavLink key={item.key} className={item.cName} as={Link} to={item.url}>
                                {item.title}
                            </NavLink>
                        );
                    })}
                    <NavDropdown title={<span className="footer-links">Language</span>} className="nav-item dropup mx-5 ">
                        <NavDropdown.Item href="/" className="mr-5 pr-3">English</NavDropdown.Item>
                        <NavDropdown.Item href="/" className="mr-5 pr-3">Spanish</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </div>
        </div>
    </footer>;
}
