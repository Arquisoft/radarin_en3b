import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriendsWithDistance, refreshFriends } from "./redux/slices/userSlice";
import { doOnce } from "./redux/slices/executingSlice";
import { setScanned } from "./redux/slices/executingSlice";
import { showMessage } from "react-native-flash-message";
import { changeLocationEnabled } from "./redux/slices/LocationsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFriends } from "./redux/slices/userSlice";


export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;
  const webId = id.replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const doUna = useSelector(state => state.executing.doOnce);
  const refreshStatus = useSelector(state => state.user.refreshStatus);


  useEffect(() => {
    console.log("Profile:" + profileStatus);
    console.log("Friends: " + friendsStatus);
    console.log("Refresh: " + refreshStatus);
    
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));
    }

    if(friendsStatus === "succeeded" && refreshStatus === "idle") {
      setTimeout(() => {
        dispatch(refreshFriends(webId));
        console.log("refreshed");
      }, 10000);
    }

    AsyncStorage.getItem("locationStatus").then((response) => {
      if (response === null) {
        dispatch(changeLocationEnabled("false"));
        dispatch(setFriends("No location"));
        navigation.navigate("Radarin");
      } else {
        dispatch(changeLocationEnabled(response));

        if (response === "true") {
          if (friendsStatus === "idle" || friendsStatus === "failed") {
            dispatch(fetchFriendsWithDistance(webId));
          } else if (friendsStatus === "succeeded") {
            navigation.navigate("Radarin");

          } else if (friendsStatus === "failed") {
            if (!doUna) {
              dispatch(doOnce());
              dispatch(setScanned(false));
              navigation.navigate("Login", { qrUpdatedFlag: true });
              showMessage({
                message: "Your session has expired.",
                description: "Your QR code has been renewed. Please, log in in the aplication again again.",
                type: "info",
                duration: 5000,
              });
            }
          }
        } else {
          dispatch(setFriends("No location"));
          navigation.navigate("Radarin");
        }
      }
    });

  });

  return (
    <View style={styles.mainScreenContainer}>
      <ImageBackground source={require("./assets/background.jpg")} style={styles.background}>
        <View style={styles.loadingScreen}>
          <Image style={styles.loadingImage}
            source={require("./assets/iconFull.png")}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ImageBackground>
    </View>
  );
}



