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
import { moveTo, refreshLocations, setPolyline, saveNames } from "../../redux/slices/locationsSlice";
import fetchPhoto from "./FetchPhoto";
import { useSession } from "@inrupt/solid-ui-react";
import removeLocation from "./RemoveLocation";
import "../../css/Location.css";

export default function Location({ childKey, title, description, coords, photo, date, sess, webId }) {
    const dispatch = useDispatch();
    let { session } = useSession();

    if (typeof sess !== "undefined") { session = sess; }

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [img, setImg] = useState(null);

    const propietary = session.info.webId === webId;

    useEffect(() => {
        if (photo !== "") {
            async function getImg() {
                const imgBlob = await fetchPhoto(session, photo, webId);

                const imgUrl = URL.createObjectURL(imgBlob);
                setImg(imgUrl);
            }

            getImg();
        }
    }, [session, photo, webId]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const removeAndClose = async () => {
        await removeLocation(session, title, description);
        dispatch(refreshLocations(session));
        handleClose2();
        handleClose();
    };

    function onClick() {
        dispatch(moveTo([0, 0]));
        dispatch(moveTo(coords[0]));
        dispatch(setPolyline([]));
        dispatch(saveNames(title.concat('$').concat(description).concat('$').concat(webId)));
    }

    let user = "";

    if (propietary) { user = "you"; }
    else { user = webId.split("//")[1].split(".")[0]; }

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
                            color="textPrimary"
                            style={{ wordWrap: "break-word" }}>
                            {user} —
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
                    <DialogContentText id="alert-dialog-description"> {user} — {description}</DialogContentText>
                    {photo !== "" &&
                        <img src={img} alt="Location" />
                    }
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                        {propietary &&
                            <Button onClick={handleOpen2} color="secondary">Remove</Button>
                        }
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