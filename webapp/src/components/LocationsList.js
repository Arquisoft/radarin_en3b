import React from "react";
import {
    List,
    ListItem,
    TextField
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, refreshLocations, setSearchText } from "../redux/slices/locationsSlice";
import { useEffect } from "react";
import "../css/LocationsList.css";
import { useSession } from "@inrupt/solid-ui-react";
import Polyline from "./locations/Polyline";


export default function LocationList() {
    const { session } = useSession();
    const dispatch = useDispatch();
    const locationStatus = useSelector(state => state.locations.status);
    const refreshStatus = useSelector(state => state.locations.refreshStatus);
    const error = useSelector(state => state.locations.error);
    const filterText = useSelector(state => state.locations.searchText);

    const locations = useSelector(state => state.locations.locations);


    useEffect(() => {
        if(locationStatus === "idle"){
            dispatch(fetchLocations(session));
        } else if(locationStatus === "succeeded" && refreshStatus === "idle") {
            setTimeout(() => {
                dispatch(refreshLocations(session));
            }, 30000);
        }
    }, [locationStatus, refreshStatus, dispatch, session]);

    const onChange = e => {
        dispatch(setSearchText(e.target.value));
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
                            value={filterText}
                        />
                    </div>
                </ListItem>
                {
                    locations.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()))
                        .map(item =>
                            <Polyline
                                key={item.id}
                                childKey={item.id}
                                name={item.name}
                                details={item.details}
                                coords={item.coords}
                            />
                        )
                }
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