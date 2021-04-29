import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "react-leaflet/";
import { useSelector } from "react-redux";

export default function MapView() {
    const coordinates = useSelector(state => state.locations.coordinates);
    const polyline = useSelector(state => state.locations.polyline);
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
                <Marker position={coordinates}>
                    <Popup></Popup>
                </Marker>
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