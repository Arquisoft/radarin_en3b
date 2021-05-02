/* eslint-disable react/prop-types */
import React from "react";
import { Button, Typography, Card, CardContent, CardActionArea, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MyLocationIcon from "@material-ui/icons/MyLocation";

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
    },
    dialogText: {
        fontSize: 20,
    },
    dialogTitleText: {
        fontSize: 60,
    }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function HelpCard({ item, counter }) {
    const classes = useStyles();
    const icons = [
        <HomeIcon className={classes.icon} />,
        <LocationOnIcon className={classes.icon} />,
        <ExitToAppIcon className={classes.icon} />,
        <MyLocationIcon className={classes.icon} />,
    ];
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea style={{ alignItems: "center", justify: "center" }} onClick={handleClickOpen}>

                {icons[`${counter}`]}

                <CardContent>
                    <Typography className={classes.title} variant="h5" component="h2">
                        {item.title}
                    </Typography>

                    <Typography className={classes.title} color="textSecondary">
                        {item.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle classes={classes.dialogTitleText} id="customized-dialog-title">{item.title}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText className={classes.dialogText} id="alert-dialog-slide-description">
                        {item.fullText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}





