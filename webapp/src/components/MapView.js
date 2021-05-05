import {Divider, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Polyline, Popup} from "react-leaflet";
import "react-leaflet/";
import {useDispatch, useSelector} from "react-redux";
import L from "leaflet";
import PurpleIcon from "../img/marker-icon-purple.png";
import BlueIcon from "../img/marker-icon-blue.png";
import GreenIcon from "../img/marker-icon-green.png";
import Shadow from "../img/marker-shadow.png";
import {useSession} from "@inrupt/solid-ui-react";
import {saveLastCoords} from "../redux/slices/locationsSlice";

export default function MapView() {
    const dispatch = useDispatch();
    const {session} = useSession();
    const coordinates = useSelector((state) => state.locations.coordinates);
    const lastCoords = useSelector((state) => state.locations.lastCoords);
    const names = useSelector((state) => state.locations.names);
    const polyline = useSelector((state) => state.locations.polyline);
    const [map, setMap] = useState(null);
    const locations = useSelector((state) => state.locations.locations);

    let result;

    const legend = function () {
        return (<div className="legend leaflet-bottom leaflet-right">
            <h4>Legend</h4>
            <i className="friendsIcon"/><span>Friend's locations</span><br/>
            <i className="ownIcon"/><span>Your own locations</span><br/>
            <i className="selectedIcon"/><span>Selected location</span><br/>
        </div>);
    }

    useEffect(() => {
        if (map) {
            if (lastCoords !== coordinates) {
                map.flyTo(coordinates, 15, {
                    animate: true,
                    duration: 1
                });
            }
            dispatch(saveLastCoords(coordinates));
        }
    });

    console.log(locations);
    const namesSplitted = names?.split('$');

    var purpleIcon = L.icon({
        iconUrl: PurpleIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [2, -35],
        shadowUrl: Shadow,
        shadowSize: [41, 41],
        shadowAnchor: [15, 41]
    });

    var blueIcon = L.icon({
        iconUrl: BlueIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [2, -35],
        shadowUrl: Shadow,
        shadowSize: [41, 41],
        shadowAnchor: [15, 41]
    });

    var greenIcon = L.icon({
        iconUrl: GreenIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [2, -35],
        shadowUrl: Shadow,
        shadowSize: [41, 41],
        shadowAnchor: [15, 41]
    });

    if (polyline.length === 0) {
        result = (
            <MapContainer
                whenCreated={(map) => setMap(map)}
                className="mapContainer"
                center={coordinates}
                zoom={15}
                scrollWheelZoom={true}
                dragging={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.length !== 0 && names !== "" &&
                locations.filter((location) => (location.type !== "poly")).map((location) => {
                    return (
                        <Marker position={location.coords[0]} key={location.id}
                                icon={location.webId !== session.info.webId ? purpleIcon : blueIcon}>
                            <Popup className="popup">
                                <Typography variant="h6" component="h6">
                                    {location.name}
                                </Typography>
                                <Divider/>
                                <Typography>
                                    {location.details}
                                </Typography>
                                <Typography>
                                    Author: {location.webId.split("//")[1].split(".")[0]}
                                </Typography>
                            </Popup>
                        </Marker>
                    )
                })}
                {names !== "" &&
                < Marker position={coordinates} icon={greenIcon}>
                    <Popup className="popup">
                        <Typography variant="h6" component="h6">
                            {namesSplitted[0]}
                        </Typography>
                        <Divider/>
                        <Typography>
                            {namesSplitted[1]}
                        </Typography>
                        <Typography>
                            Author: {namesSplitted[2].split("//")[1].split(".")[0]}
                        </Typography>
                    </Popup>
                </Marker>
                }
                {legend()}
            </MapContainer>);
    } else {
        result = (
            <MapContainer
                whenCreated={(map) => setMap(map)}
                className="mapContainer"
                center={coordinates}
                zoom={9}
                scrollWheelZoom={true}
                preferCanvas={true}
                dragging={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline
                    positions={polyline}
                    color='red'
                    weight={3}
                    opacity={0.7}
                    smoothFactor={1}
                />
                {legend()}
            </MapContainer>);
    }

    return (
        <div className="divMap d-flex justify-content-center">
            {result}
        </div>);

}
