import { Button, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsTourOpen } from "../redux/slices/tourSlice";
import Tour from "reactour";

export default function HelpPage() {
    const dispatch = useDispatch();
    const isTourOpen = useSelector(state => state.tour.isTourOpen);
    const isLogguedIn = useSelector(state => state.user.logguedStatus);

    const steps = [
      {
        selector: '[id=".first-step"]',
        content: "Here you go to the main page",
        position: "bottom"
      },
      {
        selector: '[id=".second-step"]',
        content: "Here you can see your locations and the routes that you took any day on the past",
        position: "bottom",
      },
      {
        selector: '[id=".third-step"]',
        content: "Here you can see more information about the developers of the application",
        position: "bottom"
      },
      {
        selector: '[id=".fourth-step"]',
        content: "Here you can obtain more information about how the app works and how to start sending locations from your mobile device",
        position: "bottom"
      },
      {
        selector: '[id=".fifth-step"]',
        content: "If you click here you would be able to access the qr page.",
        position: "bottom",
      },
    ];

    let content;

    if(isLogguedIn) {
      content = (<div>
        <Typography variant="h1" component="h1">
            Start using Radarin
        </Typography>
        <Button onClick={() => dispatch(setIsTourOpen(true))} color="primary" variant="contained">Press me</Button>
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
        <Typography variant="h1" component="h1">
            Start using Radarin
        </Typography>
    </div>)
    }

    return <div>{content}</div>;
}