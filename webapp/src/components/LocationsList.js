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
    { id: 1, coordinates: "43.36386580515899,-5.849344953260549", name: "Oviedo" , details: "Location #1"},
    { id: 2, coordinates: "43.54100529781973,-5.663648537529732", name: "Gijón", details: "Location #2"},
    { id: 3, coordinates: "43.17788622223873,-6.549889812225385", name: "Cangas del Narcea", details: "Location #3"},
    { id: 4, coordinates: "43.35058453382074,-5.131986455306872", name: "Cangas de Onís (la mala)", details: "Location #4"},
    { id: 5, coordinates: "43.44769919764665,-4.8859389865310705", name: "Gulpiyuri", details: "Location #5"},
    { id: 6, coordinates: "40.03810468968584,-6.086675148772555", name: "Plasencia", details: "Location #6"},
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
                        {" "}
                        <SearchIcon></SearchIcon>
                    </button>

                </div>
                <List component='nav'>
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