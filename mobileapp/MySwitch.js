import React, { useEffect } from "react";
import { Switch } from "react-native-paper";
import { getLocation } from "./GetLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { changeLocationEnabled } from "./redux/slices/LocationsSlice";

export default function MySwitch() {
  const dispatch = useDispatch();
  const switchStatus = useSelector(state => state.locations.getLocationEnabled);

  console.log("Switch Status: " + switchStatus);

  const onToggleSwitch = (value) => {
    console.log("dispatched " + value);
    dispatch(changeLocationEnabled(value.toString()));
    AsyncStorage.setItem("locationStatus", value.toString());
  }

  return <Switch color="#094072" value={switchStatus === "true"} onValueChange={onToggleSwitch} />;
};