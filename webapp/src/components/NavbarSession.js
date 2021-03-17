import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import Button from "@material-ui/core/Button";
import { LogoutButton } from "@inrupt/solid-ui-react";


function NavbarSession() {
    const { session } = useSession();
    const { webId } = session.info;

    if (!session.info.isLoggedIn) {

        return <Nav>
            <Nav.Link as={Link} to="/login" className="mr-3">
                <Button color="primary" variant="contained">Sign In</Button>
            </Nav.Link>
        </Nav>;
    }
    return <Nav>
    <Nav.Link as={Link} to="/qr">
        <AccountCircleIcon className="mr-1"></AccountCircleIcon>
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <Text property={FOAF.name.iri.value} autosave/>
        </CombinedDataProvider>
    </Nav.Link>
    <LogoutButton>
        <Button component={ Link } to="/login" color="primary" variant="contained" className="ml-3 mr-2">Log out</Button>
    </LogoutButton>
</Nav>;
}
export default NavbarSession;