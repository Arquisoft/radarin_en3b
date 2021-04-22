import React from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useDispatch } from "react-redux";
import { moveTo, setPolyline } from "../../redux/slices/locationsSlice";

export default function Polyline({ childKey, name, details, coords }) {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(moveTo([0, 0])); 
        dispatch(moveTo(coords[0]));
        dispatch(setPolyline(coords));
    }

    //const textCoords = () => `${props.coords.latitude}, ${props.coords.longitude}`;
    return (
        <ListItem
            button
            type="checkbox"
            value={name}
            key={childKey}
            defaultChecked={false}
            onClick={onClick}
        >
            <ListItemIcon>
                <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={name}
                secondary={
                    <React.Fragment>
                        {details}
                    </React.Fragment>
                } />
        </ListItem>
    );

}