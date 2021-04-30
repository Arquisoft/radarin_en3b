import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Fab } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import "../css/UploadLocation.css";
import postLocation from "./locations/PostLocation";
import { useSession } from '@inrupt/solid-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLimitedVersion, setUrlParams } from '../redux/slices/userSlice';
import { useHistory } from 'react-router';

export default function UploadLocation() {

    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const { session } = useSession();
    const dispatch = useDispatch();
    const urlParams = useSelector(state => state.user.urlParams);

    let urlParamsArray;
    let title;
    let description;
    let coords;

    if (urlParams !== "/uploadLocation") {
        urlParamsArray = urlParams.split("?")[1].split("&");

        //This should be passed to the constructor
        title = urlParamsArray[0].split("=")[1];
        description = urlParamsArray[1].split("=")[1];
        const lat = urlParamsArray[2].split("=")[1];
        const long = urlParamsArray[3].split("=")[1];

        coords = [parseInt(lat), parseInt(long)];
    }


    useEffect(() => {
        const params = window.location.hash.split("#")[1];
        dispatch(setUrlParams(params));
        dispatch(setLimitedVersion(true));


    });

    const onClick = () => {
        postLocation(session, title, description, photo, coords);
        //close the embedded browser
    };

    function uploadPhoto(event) {
        setPhoto(event.target.files[0]);
        setPhotoURL(URL.createObjectURL(event.target.files[0]));
    }

    return <Container fluid="md">
        <h1 className="loch1">Your location</h1>
        <Row>
            <Col>
                <Jumbotron className="mt-4">
                    <h2 className="loch2">Title</h2>
                    <p className="loctext">{title}</p>
                    <h2 className="loch2">Description</h2>
                    <p className="loctext">{description}</p>
                    <h2 className="loch2">Do you want to upload pictures of this location?</h2>
                    <Row>
                        <Col className="pictureButton">
                            <Button
                                variant="contained"
                                color="primary"
                                component="label"
                                className="svg_icons_container"
                                startIcon={<AddPhotoAlternateIcon className="svg_icons" />}
                            >
                                <input
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    hidden
                                    data-testid="input"
                                    onChange={uploadPhoto}
                                />
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <img className="picture" alt="location uploaded" src={photoURL} />
                        </Col>
                    </Row>
                </Jumbotron>

                <div className="fabcontainer">
                    <Fab color="primary" aria-label="send" onClick={onClick}>
                        <SendIcon />
                    </Fab>
                </div>
            </Col>

        </Row>
    </Container>;
}
