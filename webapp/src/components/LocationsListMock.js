import React from "react";
import {
    List,
    ListItem,
    TextField
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../redux/slices/locationsSlice";
import "../css/LocationsList.css";
import { useSession } from "@inrupt/solid-ui-react";
import Polyline from "./locations/Polyline";
import Location from "./locations/Location";


export default function LocationList(props) {
    let { locationType } = useSession();
    if (typeof props.locationType !== "undefined")
    {locationType = props.locationType;}
    
    const locationStatus = useSelector((state) => state.locations.status);
    const error = useSelector((state) => state.locations.error);
    const dispatch = useDispatch();

    const locations = useSelector((state) => state.locations.locations);
    const filterText = useSelector((state) => state.locations.searchText);

    const onChange = (e) => {
        dispatch(setSearchText(e.target.value));
    };

    let content;

    if (locationStatus === "loading") {
        content = (<div className="spinner-border mt-5 center2" role="status">
            <span className="sr-only">Loading...</span>
        </div>);
    } else if (locationStatus === "succeeded") {
        content = (
            <List component='nav'>
                 { locationType === "created" && 
                <ListItem>
                <div className="table-responsible mt-3 mb-3 ml-2">
                    <TextField
                        type="text"
                        data-testid="input"
                        placeholder="Search"
                        className="textField"
                        name="busqueda"
                        onChange={onChange}
                        value={filterText}
                    />
                </div>
            </ListItem>
                }
                
                {
                    locations.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()))
                        .map((item) => {
                            if (item.type === "poly" && locationType === "poly") {
                                return (
                                    <Polyline
                                        key={item.id}
                                        childKey={item.id}
                                        name={item.name}
                                        details={item.details}
                                        coords={item.coords}
                                    />);
                            } else if (item.type !== "poly" && locationType === "created") {
                                return (
                                    <Location
                                        key={item.id}
                                        childKey={item.id}
                                        title={item.name}
                                        description={item.details}
                                        coords={item.coords}
                                        photo={item.photo}
                                        date={item.date}
                                        webId={item.webId}
                                    />
                                );
                            } else {
                                return null;
                            }
                        })
                }
            </List>
        );
    } else if (locationStatus === "failed") {
        content = <div className="center2">{error}</div>;
    }

    return (
        <div>
            {content}
        </div>
    );
}