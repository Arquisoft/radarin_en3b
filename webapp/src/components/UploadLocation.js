import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Fab} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { setPicture } from "../redux/slices/locationsSlice";
import "../css/UploadLocation.css";

export default function UploadLocation() {

    const dispatch = useDispatch();
    const picture = useSelector(state => state.locations.picture);

    function handleChange(event){

        dispatch(setPicture(URL.createObjectURL(event.target.files[0])));
    }

    return <Container fluid="md">
        <h1 className="loch1">Your location</h1>
        <Row>
            <Col>
                <Jumbotron className="mt-4">
                    <h2 className="loch2">Title</h2>
                    <p className="loctext">Title for the location would go here</p>
                    <h2 className="loch2">Comment</h2>
                    <p className="loctext">Comment for the location would go here</p>
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
                                    onChange={(event) => handleChange(event)}
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    hidden
                                />
                                </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <img class="picture" src={picture}/>
                        </Col>
                    </Row>
                </Jumbotron>

                <div className="fabcontainer">
                    <Fab color="primary" aria-label="send" onClick={() => { alert('onClick'); }}>
                        <SendIcon/>
                    </Fab>
                    </div>
            </Col>
            
        </Row>
    </Container>;
}
