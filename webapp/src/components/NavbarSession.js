import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSession, CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { FOAF } from "@inrupt/lit-generated-vocab-common";

function NavbarSession() {
    const { session } = useSession();
    const { webId } = session.info;
    if (!session.info.isLoggedIn) {

        return <Nav>
            <Nav.Link as={Link} to="/login" className="mr-5 pr-3">
                <AccountCircleIcon className="mr-1"></AccountCircleIcon>
                Login
            </Nav.Link>
        </Nav>;
    }
    return <Nav>
    <Nav.Link>
        <AccountCircleIcon className="mr-1"></AccountCircleIcon>
        <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <Text property={FOAF.name.iri.value} autosave/>
        </CombinedDataProvider>
    </Nav.Link>
</Nav>;
}
export default NavbarSession;