import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "react-leaflet/";

class MapView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            coords: this.props.coordinates,
            map: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            coords: props.coordinates
        };
    }

    componentDidUpdate() {
        this.handleOnFlyTo();
    }

    handleOnFlyTo() {
        console.log("this happens");
        const { map } = this.state;
        if (map) map.flyTo(this.state.coords);
    }

    render() {
        return <div className="divMap d-flex justify-content-center">
            <MapContainer
                whenCreated={map => this.setState({ map })}
                className="mapContainer"
                center={this.state.coords}
                zoom={8}
                scrollWheelZoom={false}
                dragging={true}>
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