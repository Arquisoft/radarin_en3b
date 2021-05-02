
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { toggleSwitch } from "./redux/slices/LocationsSlice";

export default function MySwitch() {
    const switchStatus = useSelector(state => state.locations.switchStatus);
    const dispatch = useDispatch();

    const onToggleSwitch = (value) => {
        console.log("entra");
        AsyncStorage.setItem("switch", value);
        dispatch(toggleSwitch());
        //If the switch is on we start the
        AsyncStorage.setItem("backgroundLocations", value ? "active" : "inactive");
    }

    return <Switch color="#094072" value={switchStatus} onValueChange={onToggleSwitch} />;
};