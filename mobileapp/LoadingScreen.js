import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriendsWithDistance, refreshFriends, backToIdle } from "./redux/slices/userSlice";
import { doOnce, setScanned } from "./redux/slices/executingSlice";
import { showMessage } from "react-native-flash-message";
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
  const refreshError = useSelector(state => state.user.refreshError);
  const friendsError = useSelector(state => state.user.friendsError);
  const once = useSelector(state => state.executing.doOnce);


  useEffect(() => {
    //console.log(locationStatus);
    //console.log("Profile:" + profileStatus);
    //console.log("Friends: " + friendsStatus);
    console.log("Refresh: " + refreshStatus);

    //Always fetch the profile
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));
    }

      //load friends once
      if (friendsStatus === "idle") {
        dispatch(fetchFriendsWithDistance(webId));

        //once the friends are fetched, we can display the main view.
        //If the user changed the switch on the profile page this should be executed, and the user automatically redirected to the main page
      } else if (friendsStatus === "succeeded" && !once) {
        dispatch(doOnce());
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
        if (friendsError === 'JSON Parse error: Unexpected identifier "Unauthorized"'
          || refreshError === 'JSON Parse error: Unexpected identifier "Unauthorized"') {
          dispatch(setScanned(false));
          stopLocationAsync();
          dispatch(doOnce());
          BackgroundFetch.unregisterTaskAsync("friends");
          navigation.navigate("Login", { qrUpdatedFlag: true, showSc: false });
          showMessage({
            message: "Your session has expired.",
            description: "Your QR code has been renewed. Please, log in in the aplication again.",
            type: "info",
            duration: 10000,
          });
        } else {
          dispatch(backToIdle());
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



