import React from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";

export default function Location(props) {
    const textCoords = () => `${props.coords.latitude}, ${props.coords.longitude}`;
    return <ListItem button type="checkbox" value={textCoords()} defaultChecked={false} onClick={() => props.setMapCoordinates([props.coords.latitude, props.coords.longitude])}>
        <ListItemIcon>
            <LocationOnIcon />
        </ListItemIcon>
        <ListItemText primary={textCoords()}
            secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary">
                        Oviedo —
                                        </Typography>
                    {"Localización #1"}
                </React.Fragment>
            } />
    </ListItem>;

}