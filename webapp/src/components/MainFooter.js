import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

class MainFooter extends React.Component {
    render() {
        return <footer id="footer">
            <div className="d-flex align-items-center justify-content-center">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home" className="mx-5">Radarin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/privacy" className="mx-5">Privacy</Nav.Link>
                            <Nav.Link as={Link} to="/about" className="mx-5">About</Nav.Link>
                            <Nav.Link as={Link} to="/help" className="mx-5">?Help</Nav.Link>
                            <NavDropdown title="Language" id="collasible-nav-dropdown" className="nav-item dropup mx-5">
                                <NavDropdown.Item href="/" className="mr-5 pr-3">English</NavDropdown.Item>
                                <NavDropdown.Item href="/" className="mr-5 pr-3">Spanish</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </footer>
    }
}
export default MainFooter;