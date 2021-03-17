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
import { useHistory } from "react-router";


const useStyles = makeStyles({
  root: {
    width: 450,
    height: 470,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid",
    borderColor: "rgb(177, 177, 177)",
    padding: "2em",
    borderRadius: "25px",
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

function LoginPage() {

  const classes = useStyles();
  const [idp, setIdp] = useState("https://inrupt.net");


  return (
      <Card className={classes.root}>
        <CardActionArea disableRipple className={classes.removeStyles}>
          <CardContent>
            <Typography gutterBottom variant="h3" component="h2" align="center">
              Radarin
          </Typography>
            <Typography variant="h5" component="p" align="center">
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
            />
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.stopFlex}>
          <Typography variant="body2" component="p" className="text-center">
            Don't have one? You can get it here: <Link className="ml-1" href="https://inrupt.com/" target="_blank"><strong>Inrupt</strong></Link>
          </Typography>
          <LoginButton oidcIssuer={idp} type="submit">
            <Button as={Link} to="/" color="primary" variant="contained" className={classes.signIn}>Sign In</Button>
          </LoginButton>
        </CardActions>
      </Card>


    /*<React.Fragment>
      <input type="url" value={idp} onChange={(e) => setIdp(e.target.value)} />
      <LoginButton oidcIssuer={idp} redirectUrl={window.location.href}>
        <Button color="primary">Log In</Button>
      </LoginButton>
      <LogoutButton/>
    </React.Fragment>*/

  );

}
export default LoginPage;