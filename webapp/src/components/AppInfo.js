import React from "react";
import A from "react-bootstrap/SafeAnchor";
import "../css/AppInfo.css";
import { Button } from "@material-ui/core";

export default function AppInfo() {
    return <div className="divInfo">
        <br />
        <h2 className="mt-5 text-white">Enjoy Radarin on your Android phone</h2>
        <p className="mt-4 text-white">The ease and simplicity of Radarin, wherever you are.</p>
        <A href="https://expo.io/artifacts/a8545f18-185e-4226-89e2-2af619ae43fe" target="_blank">
            <Button color="primary" variant="contained" className="mb-5">Download your APK for Android</Button>
        </A>
    </div>;
}
