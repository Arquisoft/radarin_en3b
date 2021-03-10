
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "react-leaflet/";

class MapView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            coords: this.props.coordinates
        }

    }

    static getDerivedStateFromProps(props, state) {
        console.log("MapView receives. " + props.coordinates);
        return {
            coords: props.coordinates
        };
    }

    render() {
        return <div className="divMap d-flex justify-content-center">
            <MapContainer className="mapContainer" center={this.state.coords} zoom={13} scrollWheelZoom={false} dragging={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={this.state.coords}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
                </Marker>
            </MapContainer>
        </div>
            ;
    }
}

export default MapView;