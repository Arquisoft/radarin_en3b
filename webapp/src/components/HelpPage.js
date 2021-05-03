import { Button, Typography, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTourOpen } from "../redux/slices/tourSlice";
import Tour from "reactour";
import { HelpItems } from "./HelpItems";
import { makeStyles } from "@material-ui/core/styles";
import HelpCard from "./HelpCard";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "300px",
        margin: "1em",
        boxSizing: "border-box",
        alignItems: "center",
        justify: "center",
    },
    title: {
        textAlign: "center",
        align: "center",
        marginTop: "2%",
        marginBottom: "2%",
    },
    icon: {
        marginTop: "2%",
        fontSize: 40,
        color: "primary",
    },
    appBar: {
        position: "relative",
    },
    button: {
        marginTop: "2em",
    }

}));



export default function HelpPage() {
    const dispatch = useDispatch();
    const isTourOpen = useSelector((state) => state.tour.isTourOpen);
    const isLogguedIn = useSelector((state) => state.user.logguedStatus);
    const helpItems = HelpItems;

    const classes = useStyles();

 

    const steps = [
        {
            selector: "[id=\".first-step\"]",
            content: "Here you go to the main page",
            position: "bottom"
        },
        {
            selector: "[id=\".second-step\"]",
            content: "Here you can see your locations and the routes that you took any day on the past",
            position: "bottom",
        },
        {
            selector: "[id=\".third-step\"]",
            content: "Here you can see more information about the developers of the application",
            position: "bottom"
        },
        {
            selector: "[id=\".fourth-step\"]",
            content: "Here you can obtain more information about how the app works and how to start sending locations from your mobile device",
            position: "bottom"
        },
        {
            selector: "[id=\".fifth-step\"]",
            content: "If you click here you would be able to see all options regarding your Radarin Account.",
            position: "bottom",
        },
    ];

    let content;

    if (isLogguedIn) {
        content = (<div className={classes.title}>
            <Typography variant="h2" component="h2" styles={classes.title}>
        Start using Radarin
      </Typography>
      <Grid container spacing={1} alignItems="center" justify="center" >
        {
          helpItems.map((item, counter) => {
            return (
              <HelpCard item={item} counter={counter}/>
            )
          })
        }
      </Grid>
      <Button onClick={() => dispatch(setIsTourOpen(true))} color="primary" variant="contained" className={classes.button}>Open Tour</Button>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => dispatch(setIsTourOpen(false))}
        onBeforeClose={() => window.location.reload()}
        rounded={10}
        scrollOffset={500}
        lastStepNextButton={<Button color="primary" variant="contained" onClick={() => dispatch(setIsTourOpen(false))}>Quit</Button>}
      />
    </div>);
  } else {
    content = (<div>
      <Typography variant="h3" component="h3" className={classes.title} styles={classes.title}>
        Please log in or create an account to see the help.
            </Typography>
        </div>);
    }

    return <div>{content}</div>;
}