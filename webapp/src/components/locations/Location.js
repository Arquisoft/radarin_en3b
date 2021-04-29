import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useDispatch } from "react-redux";
import { moveTo, setPolyline } from "../../redux/slices/locationsSlice";
import FetchPhoto from "./FetchPhoto";

export default function Location({ childKey, title, description, coords, photo, date, sess }) {
    const dispatch = useDispatch();
    const session = sess;
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [img, setImg] = useState(null);

    useEffect(() => {
        async function getImg() {
            const imgBlob = await FetchPhoto(session, photo);

            const imgUrl = URL.createObjectURL(imgBlob);
            setImg(imgUrl);
        }

        getImg();
    }, [session, photo]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen2 = () => {
        setOpen2(true);
    }

    const handleClose2 = () => {
        setOpen2(false);
    }

    const removeAndClose = () => {
        //remove
        handleClose2();
    }

    function onClick() {
        dispatch(moveTo([0, 0]));
        dispatch(moveTo(coords[0]));
        dispatch(setPolyline([]));
    }

    return (
        <ListItem
            button
            type="checkbox"
            value={title}
            key={childKey}
            defaultChecked={false}
            onClick={onClick}
        >
            <ListItemIcon>
                <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={title}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary">
                            {description} —
                    </Typography>
                        {date}
                    </React.Fragment>
                } />
            <Button color="primary" onClick={handleOpen}>Open</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
                    <img src={img} alt="Location" />
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                        <Button onClick={handleOpen2} color="secondary">Remove</Button>
                        <Dialog
                        open={open2}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title2"
                        aria-describedby="alert-dialog-description2"
                        >
                            <DialogTitle id="alert-dialog-title2">Are you sure?</DialogTitle>
                            <DialogContent>
                                <Button onClick={handleClose2} color="primary">Close</Button>
                                <Button onClick={removeAndClose} color="secondary">Remove</Button>
                            </DialogContent>
                        </Dialog>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </ListItem>
    );

}