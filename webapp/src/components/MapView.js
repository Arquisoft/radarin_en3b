import { Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "react-leaflet/";
import { useSelector } from "react-redux";

export default function MapView() {
    const coordinates = useSelector((state) => state.locations.coordinates);
    const names = useSelector((state) => state.locations.names);
    const polyline = useSelector((state) => state.locations.polyline);
    const [map, setMap] = useState(null);

    let result;

    useEffect(() => {
        if (map) {
            map.flyTo(coordinates, 15, {
                animate: true,
                duration: 1
            });
        }
    });

    const namesSplitted = names.split('$');


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
                {names !== "" &&
                    <Marker position={coordinates}>
                        <Popup className="popup">
                            <Typography variant="h6" component="h6">
                                {namesSplitted[0]}
                            </Typography>
                            <Divider />
                            <Typography>
                                {namesSplitted[1]}
                            </Typography>
                            <Typography>
                                Author: {namesSplitted[2].split("//")[1].split(".")[0]}
                            </Typography>
                        </Popup>
                    </Marker>
                }
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
            </MapContainer>);
    }

    return (
        <div className="divMap d-flex justify-content-center">
            {result}
        </div>);

}
