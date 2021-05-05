import React from "react";
import { View } from "react-native";
import { Overlay } from "react-native-elements";
import styles from "../MyStyles";
import MyOverlayLocationSupport from "../MyLocationTour";
import MyPressable from "./MyPressable";
import MyForm from "./MyForm";
import { useDispatch, useSelector } from "react-redux";
import { changeOverlayVisible } from "../redux/slices/executingSlice";

export default function MyOverlay({ firstLogin }) {
    const visible = useSelector(state => state.executing.overlayVisible);
    const dispatch = useDispatch();

    const toggleOverlay = () => {
      dispatch(changeOverlayVisible());
    };

    return (
      <View style={styles.homeScreenContainer}>
        <MyPressable onPressing={toggleOverlay} />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <MyForm />
        </Overlay>
        {(firstLogin && visible) && <MyOverlayLocationSupport /> }
      </View>)
  }