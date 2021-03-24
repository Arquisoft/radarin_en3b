import React from "react";
import "../css/AppInfo.css";

class AppInfo extends React.Component {
    render() {
        return <div className="divInfo bg-white">
            <br/>
            <h2 className="mt-5">Enjoy Radarin on any device</h2>
            <p className="mt-4">The ease and simplicity of Radarin, wherever you are.</p>
            <img alt="badge" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" className="pS mb-5"/>
        </div>;
    }
}

export default AppInfo;