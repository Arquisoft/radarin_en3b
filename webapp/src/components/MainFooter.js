import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/Footer.css";

class MainFooter extends React.Component {
    render() {
        return <footer className="footer">
            <div className="lightBg">
            <div className="d-flex align-items-center justify-content-center">
                <Navbar className="lightBg" expand="lg">
                    <Navbar.Brand href="#home" className="mx-5">Radarin</Navbar.Brand>
                </Navbar>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <Navbar className="lightBg" expand="lg">
                        <Nav.Link as={Link} to="/privacy" className="mx-5 text-dark">Privacy</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="mx-5 text-dark">About</Nav.Link>
                        <Nav.Link as={Link} to="/help" className="mx-5 text-dark">?Help</Nav.Link>
                        <NavDropdown title={<span className="text-dark">Language</span>} className="nav-item dropup mx-5 ">
                            <NavDropdown.Item href="/" className="mr-5 pr-3">English</NavDropdown.Item>
                            <NavDropdown.Item href="/" className="mr-5 pr-3">Spanish</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>
                </div>
            </div>
        </footer>;
    }
}
export default MainFooter;