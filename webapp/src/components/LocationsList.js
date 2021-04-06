import React, { useState } from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    TextField
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, moveTo, selectAllLocations } from "../redux/slices/locationsSlice";
import { useEffect } from "react";
import "../css/LocationsList.css";


export default function LocationList() {
    const dispatch = useDispatch();
    const locationStatus = useSelector(state => state.locations.status);
    const error = useSelector(state => state.locations.error);

    const locations = useSelector(selectAllLocations);

    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        if (locationStatus === "idle") {
            dispatch(fetchLocations());

        }
    }, [locationStatus, dispatch]);

    const onChange = e => {
        setFilterText(e.target.value);
    }

    let content;

    if (locationStatus === "loading") {
        content = (<div className="spinner-border mt-5 center2" role="status">
            <span className="sr-only">Loading...</span>
        </div>);
    } else if (locationStatus === "succeeded") {
        content = (
            <List component='nav'>
                <ListItem>
                    <div className="table-responsible mt-3 mb-3 ml-2">
                        <TextField
                            type="text"
                            placeholder="Search"
                            className="textField"
                            name="busqueda"
                            onChange={onChange}
                        />
                    </div>
                </ListItem>
                {
                    locations.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()))
                        .map(item =>
                            <ListItem
                                button type="checkbox"
                                value={item.coordinates}
                                key={item.id}
                                defaultChecked={false}
                                onClick={() => { dispatch(moveTo([0, 0])); dispatch(moveTo(item.coordinates)) }}
                            >
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
        );
    } else if (locationStatus === "failed") {
        content = <div className="center2">{error}</div>
    }

    return (
        <div>
            {content}
        </div>
    );
}