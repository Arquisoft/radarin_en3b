import React from "react";
import "../css/AppInfo.css";

class AppInfo extends React.Component {
    render() {
        return <div className="divInfo bg-white">
            <br/>
            <h2 className="mt-5">Disfruta de Radarín en cualquier dispositivo</h2>
            <p className="mt-4">La sencillez y facilidad de Radarín, estés donde estés.</p>
            <img src="https://play.google.com/intl/es-419/badges/static/images/badges/es-419_badge_web_generic.png" className="pS mb-5"/>
        </div>;
    }
}

export default AppInfo;