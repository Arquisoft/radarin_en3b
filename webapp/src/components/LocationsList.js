import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

class LocationList extends React.Component {

    handleClick = (event, coordinates) => {
        this.props.parentCallback(coordinates.split(","));
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <List component='nav'>
                    <ListItem button type="checkbox" value={"43.3589,-5.8461"} defaultChecked={false} onClick={(e) => this.handleClick(e,"43.3589,-5.8461")}>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='43.3589,-5.8461'
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Oviedo — 
                                        </Typography>
                                    {"Localización #1"}
                                </React.Fragment>
                            } />
                    </ListItem>

                    <ListItem button type="checkbox" value={"43.5424,-5.6631"} defaultChecked={false} onClick={(e) => this.handleClick(e,"43.5424,-5.6631")}>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='43.5424,-5.6631'
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Gijón —
                                        </Typography>
                                    {"Localización #2"}
                                </React.Fragment>
                            } />
                    </ListItem>

                    <ListItem button type="checkbox" value={"43.1757, -6.5492"} defaultChecked={false} onClick={(e) => this.handleClick(e,"43.1757, -6.5492")}>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='43.1757, -6.5492'
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Cangas del Narcea —
                                        </Typography>
                                    {"Localización #3"}
                                </React.Fragment>
                            } />
                    </ListItem>

                    <Divider />

                </List>
            </div>
        )
    }

}

export default LocationList;