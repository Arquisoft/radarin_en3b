import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Fab} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import "../css/UploadLocation.css";
import postLocation from "./locations/PostLocation";
import { useSession } from '@inrupt/solid-ui-react';

export default function UploadLocation() {
    const [photo, setPhoto] = useState(null);
    const { session } = useSession();

    //This should be passed to the constructor
    const title = "Title";
    const description = "Sample text";


    const onClick = () => {
        postLocation(session, title, description, photo);
        //close the embedded browser
    }

    function uploadPhoto(event) {
        setPhoto(event.target.files[0]);
    }

    return <Container fluid="md">
        <h1 className="loch1">Your location</h1>
        <Row>
            <Col>
                <Jumbotron className="mt-4">
                    <h2 className="loch2">Title</h2>
                    <p className="loctext">{ title }</p>
                    <h2 className="loch2">Description</h2>
                    <p className="loctext">{ description }</p>
                    <h2 className="loch2">Do you want to upload pictures of this location?</h2>
                    <Row>
                        <Col className="pictureButton">
                                <Button
                                variant="contained"
                                color="primary"
                                component="label"
                                className="svg_icons_container"
                                startIcon={<AddPhotoAlternateIcon className="svg_icons"/>}
                                >
                                <input
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    hidden
                                    onChange={ uploadPhoto }
                                />
                                </Button>
                        </Col>
                    </Row>
                </Jumbotron>

                <div className="fabcontainer">
                    <Fab color="primary" aria-label="send" onClick={onClick}>
                        <SendIcon/>
                    </Fab>
                    </div>
            </Col>
            
        </Row>
    </Container>;
}
