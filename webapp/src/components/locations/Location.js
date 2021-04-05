import React from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useDispatch } from "react-redux";
import { moveTo } from "../../redux/slices/locationsSlice";

export default function Location({ key, name, details, coords }) {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(moveTo([0, 0])); 
        dispatch(moveTo(coords));
    }

    //const textCoords = () => `${props.coords.latitude}, ${props.coords.longitude}`;
    return (
        <ListItem
            button
            type="checkbox"
            value={coords}
            key={key}
            defaultChecked={false}
            onClick={onClick}
        >
            <ListItemIcon>
                <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={coords}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary">
                            {name} —
                    </Typography>
                        {details}
                    </React.Fragment>
                } />
        </ListItem>
    );

}