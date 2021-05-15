import React from "react";
import MainCarousel from "./MainCarousel";
import AppInfo from "./AppInfo";
import "../css/MainView.css";

export default function MainView() {
    return (
        <div id="fullScreen6"><div id="scroll3">
            <MainCarousel />
            <AppInfo />
        </div></div>
    );
}