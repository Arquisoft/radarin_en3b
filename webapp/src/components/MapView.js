
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "react-leaflet/";

class MapView extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            coordinates: [51.505, -0.09]
        }

        this.showLocation = this.showLocation.bind(this);
    }

    static showLocation(){
        
        this.setState({
            coordinates: [43.3589,-5.8461]
        });

        return this.showMap();
    }

    render() {
        return this.showMap();
    }

    showMap() {
        return <div className="divMap d-flex justify-content-center">
        <MapContainer className="mapContainer" center={this.state.coordinates} zoom={13} scrollWheelZoom={false} dragging={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={this.state.coordinates}>
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