/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../css/DisableHighlighted.css";
import { Link } from "@material-ui/core";
import "../css/LoginPage.css";
import { useDispatch } from "react-redux";
import { setLogguedStatus } from "../redux/slices/userSlice";
import Autocomplete from "@material-ui/lab/Autocomplete";


const useStyles = makeStyles({
    root: {
        width: 450,
        height: 570,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid",
        borderColor: "rgb(177, 177, 177)",
        padding: "2em",
        borderRadius: "25px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(11px)",
    },
    placeholder: {
        "&::placeholder": {
            color: "white",
        },
    },
    input: {
        type: "url",
        marginTop: "3em",
    },
    removeStyles: {
        "&:hover": {
            cursor: "default",
        },
    },
    stopFlex: {
        display: "block",
    },
    signIn: {
        marginTop: "3em",
        marginRight: "0.5em",
        float: "right",
    },
});

function LoginPage(props) {
    let redirectUrl;

    if (typeof props.redirectUrl === "undefined") { redirectUrl = window.location.origin; }
    else { redirectUrl = window.location.origin.concat("#" + props.redirectUrl); }

    const classes = useStyles();
    const [idp, setIdp] = useState("https://inrupt.net");
    const dispatch = useDispatch();

    const providers = [
        { name: "Inrupt", value: "https://inrupt.net" },
        { name: "SolidCommunity", value: "https://solidcommunity.net" },
    ];

    function callback() {
        dispatch(setLogguedStatus(true));
    }


    return (
        <div className="fullScreen2">
            <Card className={classes.root}>
                <CardActionArea disableRipple className={classes.removeStyles}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2" align="center" className="text-white">
                            Radarin
                    </Typography>
                        <Typography variant="h5" component="p" align="center" className="text-white">
                            Sign In
                    </Typography>
                        <TextField
                            label="URL"
                            helperText="Introduce your Provider URL"
                            variant="outlined"
                            fullWidth
                            placeholder={idp}
                            className={classes.input}
                            onChange={(e) => setIdp(e.target.value)}
                            InputProps={{
                                classes: {
                                    input: classes.placeholder,
                                }
                            }}
                        />
                        <Autocomplete
                            options={providers}
                            getOptionLabel={(option) => option.name}
                            fullWidth
                            data-testid="provider"
                            renderInput={(params) => <TextField {...params} label="Provider" variant="outlined" />}
                            onChange={(e, value) => { setIdp(value.value); console.log(value) }}
                            className={classes.input}
                        />
                        <Typography className="mt-2 text-white" variant="subtitle2" component="p" align="center">
                            Or select one of the above
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.stopFlex}>
                    <Typography variant="body2" component="p" className="text-center text-white">
                        Don't have one? You can get it here: <Link className="ml-1" href="https://inrupt.com/" target="_blank"><strong>Inrupt</strong></Link>
                    </Typography>
                    <LoginButton oidcIssuer={idp} redirectUrl={redirectUrl}>
                        <Button id="SignInButton" data-testid="button" color="primary" variant="contained" className={classes.signIn} onClick={callback}>Sign In</Button>
                    </LoginButton>
                </CardActions>
            </Card>
        </div>
    );
}
export default LoginPage;