import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Fab, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "../css/UploadLocation.css";
import { useSession } from "@inrupt/solid-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { setLimitedVersion, setUrlParams } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
import postLocation from "./locations/PostLocation";

export default function UploadLocation() {
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const { session } = useSession();
    const dispatch = useDispatch();
    const urlParams = useSelector((state) => state.user.urlParams);
    const logguedStatus = useSelector((state) => state.user.logguedStatus);
    const [locationSent, setLocationSent] = useState(false);
    const [showClose, setShowClose] = useState(false);

    session.logout();

    let urlParamsArray;
    let title;
    let description;
    let coords;

    if (urlParams !== "undefined") {
        urlParamsArray = urlParams.split("?")[1].split("&");

        //This should be passed to the constructor
        title = decodeURI(urlParamsArray[0].split("=")[1]);
        description = decodeURI(urlParamsArray[1].split("=")[1]);
        const lat = urlParamsArray[2].split("=")[1];
        const long = urlParamsArray[3].split("=")[1];

        coords = "[" + parseFloat(lat) + "," + parseFloat(long) + "]";
    }


    useEffect(() => {
        const params = window.location.hash.split("#")[1];
        dispatch(setUrlParams(params));
        dispatch(setLimitedVersion(true));

        if(locationSent){
            setTimeout(() => {
                setShowClose(true);
            }, 3000);
        }
    });

    const onClick = () => {
        postLocation(session, title, description, photo, coords);
        setLocationSent(true);
    };

    function uploadPhoto(event) {
        setPhoto(event.target.files[0]);
        setPhotoURL(URL.createObjectURL(event.target.files[0]));
    }

    if (!logguedStatus) {
        return (
            <div className="divCenter">
                <Typography variant="h4" component="h2" className="text">
                    You need to sign in first
                </Typography>
                <Button component={Link} to="/login" color="primary" variant="contained" className="loginButton">Sign In</Button>
            </div>
        );
    } else if (!locationSent) {

        return <Container fluid="md">
            <h1 className="loch1">Your location</h1>
            <Row>
                <Col>
                    <Jumbotron className="mt-4">
                        <h2 className="loch2">Title</h2>
                        <p className="loctext">{title}</p>
                        <h2 className="loch2">Description</h2>
                        <p className="loctext">{description}</p>
                        <h2 className="loch2">Do you want to upload a picture of this location?</h2>
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
                                {photo !== null &&
                                    <img className="picture" alt="location uploaded" src={photoURL} />
                                }
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
    } else {
        if (!showClose) {
            return (
                <div className="spinner-border mt-5 center3" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        } else {
            return (
                <div className="divCenter">
                    <Typography variant="h4" component="h1" className="text">
                        You can close the embedded browser now.
                </Typography>
                </div>
            );
        }
    }
}
