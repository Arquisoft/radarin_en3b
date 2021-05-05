import React from "react";
import "../css/AppInfo.css";

export default function AppInfo() {
    return <div className="divInfo bg-white">
        <br />
        <h2 className="mt-5">Enjoy Radarin on your Android phone</h2>
        <p className="mt-4">The ease and simplicity of Radarin, wherever you are.</p>
        <A href="https://expo.io/artifacts/f960a5eb-108d-4ae4-a75b-c08907e39171" target="_blank">
            <Button color="primary" variant="contained">Download your APK for Android</Button>
        </A>
    </div>;
}
