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
import SearchIcon from "@material-ui/icons/Search";

const locationsList = [
    { id: 1, coordinates: "43.3638658051, -5.84934495326", name: "Oviedo", details: "Location #1" },
    { id: 2, coordinates: "43.5410052978, -5.66364853752", name: "Gijón", details: "Location #2" },
    { id: 3, coordinates: "43.1778862222, -6.54988981222", name: "Cangas del Narcea", details: "Location #3" },
    { id: 4, coordinates: "43.3505845338, -5.13198645530", name: "Cangas de Onís (la mala)", details: "Location #4" },
    { id: 5, coordinates: "43.4476991976, -4.885938986531", name: "Gulpiyuri", details: "Location #5" },
    { id: 6, coordinates: "40.0381046896, -6.08667514877", name: "Plasencia", details: "Location #6" },
];

class LocationList extends React.Component {

    state = {
        search: '',
        locations: []
    }

    handleClick = (event, coordinates) => {
        this.props.parentCallback(coordinates.split(","));
        event.preventDefault();
    }

    onChange = async e => {
        e.persist();
        await this.setState({ search: e.target.value });
        this.filterElements();
    }

    filterElements = () => {
        var search = locationsList.filter(item => {
            if (item.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                return item;
            }
            return null;
        });
        this.setState({ locations: search });
    }

    componentDidMount() {
        this.setState({ locations: locationsList });
    }

    render() {
        return (
            <div>
                <List component='nav'>
                    <ListItem>
                        <div className="table-responsible">
                            <input
                                type="text"
                                placeholder="Search"
                                className="textField"
                                name="busqueda"
                                value={this.state.search}
                                onChange={this.onChange}
                            />
                            <button
                                type="button"
                                className="btnBuscar">
                                <SearchIcon></SearchIcon>
                            </button>
                        </div>
                    </ListItem>
                    {
                        this.state.locations.map(item =>
                            <ListItem button type="checkbox" value={item.coordinates} defaultChecked={false} onClick={(e) => this.handleClick(e, item.coordinates)}>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText primary={item.coordinates}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {item.name} -
                                        </Typography>
                                            {item.details}
                                        </React.Fragment>
                                    } />
                            </ListItem>
                        )
                    }


                    <Divider />

                </List>
            </div>
        );
    }

}

export default LocationList;