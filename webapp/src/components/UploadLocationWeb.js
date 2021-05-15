import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import { Button, Fab, Tabs, TextField, Tab, Box, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import "../css/UploadLocation.css";
import { useSession } from "@inrupt/solid-ui-react";
import postLocation from "./locations/PostLocation";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import postCurrentLocation from "./locations/PostCurrentLocation";

const useStyles = makeStyles({
    root: {
        width: 650,
        height: "auto",
        position: "fixed",
        top: "53%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "2em",
        borderRadius: "25px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(11px)",
    },
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
    const history = useHistory();
    const [value, setValue] = useState(0);
    const [position, setPosition] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus(false);
        } else {
            setStatus(true);
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                setPosition(position);
            });
        }
    }, [setStatus]);

    const onClick = () => {
        console.log(desc);
        postLocation(session, title, desc, photo, "[" + lat + "," + long + "]", false);
        setLocationSent(true);
    };

    const onClick2 = () => {
        postCurrentLocation(session.info.webId, position);
        setLocationSent(true);
    }

    function uploadPhoto(event) {
        setPhoto(event.target.files[0]);
        setPhotoURL(URL.createObjectURL(event.target.files[0]));
    }

    let content;

    if (!status) {
        content = <p>Geolocation is not suppported by your browser</p>;
    } else if (!locationSent) {
        content = (
            <Card className={classes.root}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Custom location" className="text-white" {...a11yProps(0)}/>
                    <Tab label="Current location" className="text-white" {...a11yProps(0)}/>
                </Tabs>
                <TabPanel value={value} index={0}>
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
                                label="Description"
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                <Row>
                    <Col>
                        <div className="mt-4 blurDiv">
                            <h1 className="loch1 text-white pt-3 pl-3">Current location</h1>
                            <p id="upload">Upload your current location, and you would be able to see your daily routes as a polyline on the map!</p>
                            <Button id="buttonUpload" color="secondary" variant="contained" onClick={onClick2}>Upload Location</Button>
                        </div>
                    </Col>
                </Row>
                </TabPanel>
            </Card>
        );
    } else {
        content = (
            <Card className={classes.root}>
                <Row>
                    <p id="locationSent">Location sent</p>
                </Row>
            </Card>
        );

        setTimeout(() => {
            history.push("/locations");
        }, 2000);
    }

    return <div className="fullScreen"><Container fluid="md" className={classes.container}>{content}</Container></div>;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
