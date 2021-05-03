import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriendsWithDistance, refreshFriends } from "./redux/slices/userSlice";
import { setScanned } from "./redux/slices/executingSlice";
import { showMessage } from "react-native-flash-message";
import { setFriends } from "./redux/slices/userSlice";
import { setNotificationsBackground } from "./SetNotifications";
import { stopLocationAsync } from "./GetAsyncLocation";
import * as BackgroundFetch from 'expo-background-fetch';


export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;
  const webId = id?.replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const refreshStatus = useSelector(state => state.user.refreshStatus);
  const locationStatus = useSelector(state => state.locations.getLocationEnabled);


  useEffect(() => {
    console.log(locationStatus);
    console.log("Profile:" + profileStatus);
    console.log("Friends: " + friendsStatus);
    console.log("Refresh: " + refreshStatus);

    //Always fetch the profile
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));
    }

    //The switch is turned off on profile page
    if (!locationStatus) {
      dispatch(setFriends("No location"));
      navigation.navigate("Radarin");

      //the switch is on
    } else {
      //load friends once
      if (friendsStatus === "idle") {
        dispatch(fetchFriendsWithDistance(webId));

        //once the friends are fetched, we can display the main view.
        //If the user changed the switch on the profile page this should be executed, and the user automatically redirected to the main page
      } else if (friendsStatus === "succeeded") {
        navigation.navigate("Radarin");
      } 

      //If the friends are fetched we start the reloading process
      if (friendsStatus === "succeeded" && refreshStatus === "idle") {
        console.log("wanted to refresh");
        setNotificationsBackground();
        setTimeout(() => {
          dispatch(refreshFriends(webId));
          console.log("refreshed");
        }, 10000);
      }

      //if fetching the friends failed that means that the QR changed, so we redirect the user to the login view.
      else if (friendsStatus === "failed" || refreshStatus === "failed") {
        dispatch(setScanned(false));
        stopLocationAsync();
        BackgroundFetch.unregisterTaskAsync("friends");
        navigation.navigate("Login", { qrUpdatedFlag: true, showSc: false });
        showMessage({
          message: "Your session has expired.",
          description: "Your QR code has been renewed. Please, log in in the aplication again.",
          type: "info",
          duration: 5000,
        });
      }
    }
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



