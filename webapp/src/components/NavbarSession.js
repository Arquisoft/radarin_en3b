/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import Button from "@material-ui/core/Button";
import { LogoutButton } from "@inrupt/solid-ui-react";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setLogguedStatus } from "../redux/slices/userSlice";
import { NavDropdown } from "react-bootstrap";
import CodeIcon from "@material-ui/icons/Code";
import { NavbarItems } from "./NavbarItems";
import NavLink from "react-bootstrap/NavLink";
import "../css/MainNavbar.css";
import Logo from "../img/radarin_logo.png";
import { useHistory } from "react-router-dom";
import { fetchLocations } from "../redux/slices/locationsSlice";


function NavbarSession(props) {
    const { session } = useSession();
    let { webId } = session.info;
    if (typeof props.webId !== "undefined")
    {webId = props.webId;}
    const dispatch = useDispatch();
    const history = useHistory();
    const limitedVersion = useSelector((state) => state.user.limitedVersion);


    useEffect(() => {
        if (typeof webId !== "undefined" && webId.includes("https://")) {
            dispatch(fetchLocations(session));
        }
    });

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
        <Navbar bg="white" expand="lg" className="navBar fixed-top align-items center shadow rounded" >
            { !limitedVersion &&
                <Navbar.Brand as={Link} to="/" className="mb-1">
                    <img src={Logo} alt="Radarin Logo"></img>
                </Navbar.Brand>
            }
            { limitedVersion &&
                <Navbar.Brand className="mb-1">
                    <img src={Logo} alt="Radarin Logo"></img>
                </Navbar.Brand>
            }
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {!limitedVersion &&
                    <Nav className="mr-auto">
                        {NavbarItems.map((item) => {
                            return (
                                <NavLink key={item.key} className={item.cName} as={Link} to={item.url} id={item.id}>
                                    {item.title}
                                </NavLink>
                            );
                        })}
                    </Nav>
                }
                <Nav>
                    {!limitedVersion &&
                        <NavDropdown title={dropdownTitle} className="nav-item mr-3" id=".fifth-step">
                            
                            <NavDropdown.Item as={Link} to="/qr">
                                <CodeIcon className="mr-2" />
                                QR
                            </NavDropdown.Item>
                            
                        </NavDropdown>
                    }
                    
                    {limitedVersion &&
                        <Navbar.Text className="nav-item mr-3">{dropdownTitle}</Navbar.Text>
                    }
                    <LogoutButton>
                        <Button color="primary" variant="contained" className="ml-3 mr-2" id="logoutButton" onClick={logout}>Log out</Button>
                    </LogoutButton>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );
}
export default NavbarSession;