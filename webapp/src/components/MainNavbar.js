import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

class MainNavbar extends React.Component {
    render() {
        return <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Radarin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/localizations" >Localizations</Nav.Link>
                    <Nav.Link as={Link} to="/about" >About</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown alignRight title="User" id="collasible-nav-dropdown" className="mr-5">
                        <NavDropdown.Item href="/profile" className="mr-5 pr-3">Profile</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}
export default MainNavbar;