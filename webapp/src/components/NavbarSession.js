import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import Button from "@material-ui/core/Button";
import { LogoutButton } from "@inrupt/solid-ui-react";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { setLogguedStatus } from "../redux/slices/userSlice";
import { useHistory } from "react-router-dom";
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import CodeIcon from "@material-ui/icons/Code";


function NavbarSession() {
    const { session } = useSession();
    const { webId } = session.info;
    const dispatch = useDispatch();
    const history = useHistory();

    const dropdownTitle = (
        <span>
            <AccountCircleIcon className="mr-2"></AccountCircleIcon>
            <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
                <Text property={FOAF.name.iri.value} autosave />
            </CombinedDataProvider>
        </span>
    );


    function logout() {
        dispatch(setLogguedStatus(false));
        session.info.isLoggedIn = false;
        history.push("/login");
    }

    return (
        <Navbar bg="white" expand="lg" className="navBar fixed-top align-items center shadow rounded">
            <Navbar.Brand as={Link} to="/" className="mb-1">Radarin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/locations" >Locations</Nav.Link>
                    <Nav.Link as={Link} to="/about" >About</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title={dropdownTitle} className="nav-item mr-3">
                        <NavDropdown.Item as={Link} to="/qr">
                            <CodeIcon className="mr-2"/>
                            QR
                        </NavDropdown.Item>
                    </NavDropdown>
                    <LogoutButton>
                        <Button color="primary" variant="contained" className="ml-3 mr-2" onClick={logout}>Log out</Button>
                    </LogoutButton>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );
}
export default NavbarSession;