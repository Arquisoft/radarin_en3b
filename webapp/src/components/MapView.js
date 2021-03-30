import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "react-leaflet/";
import { useSelector } from "react-redux";

export default function MapView() {
    const coordinates = useSelector(state => state.locations.coordinates);
    const [map, setMap] = useState(null);
    
    useEffect(() => {
        if (map) {
            map.flyTo(coordinates, 15, {
                animate: true,
                duration: 1
            });
        }
    });

    return <div className="divMap d-flex justify-content-center">
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
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
            </Marker>
        </MapContainer>
    </div>;
}