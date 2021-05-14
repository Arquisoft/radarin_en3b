import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Fab, TextField, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "../css/UploadLocation.css";
import { useSession } from "@inrupt/solid-ui-react";
import { useDispatch } from "react-redux";
import postLocation from "./locations/PostLocation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    textField: {
        width: "80%",
        border: "3px",
        marginLeft: "10%",
        marginTop: "3em",
    },
    input: {
        color: "white",
        background: "rgba(0,0,0, 0.5)",
    },
    placeholder: {
        "&::placeholder": {
            color: "white",
        },
    },
    focused: {
        borderColor: "green",
    },
    container: {
        marginTop: "5em",
        width: "60em"
    },
    button: {
        width: "6em",
        height: "3em",
        marginLeft: 0,

    }
});



export default function UploadLocation() {
    const classes = useStyles();
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const { session } = useSession();
    const [locationSent, setLocationSent] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState(false);
    const [lat, setLat] = useState(null);
    const [long, setLng] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus(false);
        } else {
            setStatus(true);
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            });
        }
    });

    const onClick = () => {
        console.log(desc);
        postLocation(session, title, desc, photo, "[" + lat + "," + long + "]", false);
        setLocationSent(true);
    };

    function uploadPhoto(event) {
        setPhoto(event.target.files[0]);
        setPhotoURL(URL.createObjectURL(event.target.files[0]));
    }

    let content;

    if (!status) {
        content = <p>Geolocation is not suppported by your browser</p>;
    } else if (!locationSent) {
        content = (
            <div>
                <Row>
                    <Col>
                        <div className="mt-4 blurDiv">
                            <h1 className="loch1 text-white pt-3 pl-3">Your location</h1>
                            <TextField
                                label="Title"
                                helperText="Choose a title for the location"
                                variant="outlined"
                                fullWidth
                                placeholder="Title"
                                className={classes.textField}
                                onChange={(e) => setTitle(e.target.value)}
                                InputProps={{
                                    className: classes.input,
                                    classes: {
                                        focused: classes.focused,
                                        input: classes.placeholder,
                                    }
                                }}
                                InputLabelProps
                            />
                            <TextField
                                label="Desc"
                                helperText="And a description"
                                variant="outlined"
                                fullWidth
                                placeholder="Description"
                                className={classes.textField}
                                onChange={(e) => setDesc(e.target.value)}
                                InputProps={{
                                    className: classes.input,
                                    classes: {
                                        focused: classes.focused,
                                        input: classes.placeholder,
                                    }
                                }}
                            />
                            <h2 className="loch2 mt-5 text-white">Do you want to upload a picture of this location?</h2>
                            <Row>
                                <Col className="pictureButton">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="label"
                                        className={classes.button}
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
                        </div>

                        <div className="fabcontainer">
                            <Fab color="primary" aria-label="send" onClick={onClick}>
                                <SendIcon />
                            </Fab>
                        </div>
                    </Col>

                </Row>
            </div>
        );
    } else {
        <p>Location sent</p>
    }

    return <div className="fullScreen"><Container fluid="md" className={classes.container}>{content}</Container></div>;
}
