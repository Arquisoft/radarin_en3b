import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography
} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';

class LocationList extends React.Component {

    onLocationChange = (event) => {
        this.props.parentCallback([4, 5]);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <List component='nav'>
                    <ListItem button onClick={this.onLocationChange}>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='Nombre amigo #1'
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Gijón —
                                        </Typography>
                                    {"43.3589,-5.8461"}
                                </React.Fragment>
                            } />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='Nombre amigo #2'
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Oviedo —
                                        </Typography>
                                    {"43.5424,-5.6631"}
                                </React.Fragment>
                            } />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='Nombre amigo #3'
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Cangas del Narcea —
                                        </Typography>
                                    {"43.1757, -6.5492"}
                                </React.Fragment>
                            } />
                    </ListItem>

                    <Divider />

                </List>
            </div>
        )
    }

    showLocation(param) {
        this.setState({
            coordinates: param.split(',')
        });
    }
}

export default LocationList