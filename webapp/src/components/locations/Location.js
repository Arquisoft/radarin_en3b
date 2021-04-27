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
import { useSession } from "@inrupt/solid-ui-react";

export default function Location({ childKey, title, description, coords, photo, date }) {
    const dispatch = useDispatch();
    const { session } = useSession();
    const [open, setOpen] = useState(false);
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
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </ListItem>
    );

}