import React from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useDispatch } from "react-redux";
import { moveTo, setPolyline } from "../../redux/slices/locationsSlice";

export default function Location({ childKey, title, description, coords, photo, date }) {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(moveTo([0, 0])); 
        dispatch(moveTo(coords));
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
        </ListItem>
    );

}