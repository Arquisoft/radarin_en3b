import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends, fetchFriendsWithDistance, backToIdle} from "./redux/slices/userSlice";
import { doOnce, doOnceNotifications} from "./redux/slices/executingSlice";
import BackgroundTask from "./FetchFriendsBackground";
import { setScanned } from "./redux/slices/executingSlice";
import { showMessage, hideMessage } from "react-native-flash-message";

import { getFriendsNames } from "./FetchFriends";
import { setNotificationsBackground, schedulePushNotificationFriends, schedulePushNotificationFriendsClose} from "./SetNotifications";
import AsyncStorage from "@react-native-community/async-storage";

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;
  const webId = id.replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const closeFriendsStatus = useSelector(state => state.user.closeFriendsStatus);
  const doUna = useSelector(state => state.executing.doOnce);
  const doUnaNots = useSelector(state => state.executing.doOnceNotifications);
  const onlineCloseFriends = useSelector(state => state.user.onlineCloseFriends);
  

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle" && profileStatus === "succeeded") {
      dispatch(fetchFriends(webId));
    } else if (closeFriendsStatus === "idle" && friendsStatus === "succeeded") {  
      dispatch(fetchFriendsWithDistance()); 
    } else if (closeFriendsStatus === "succeeded") {
      if(!doUnaNots) {
        dispatch(doOnceNotifications());

        setNotificationsBackground();

        navigation.navigate("Radarin");

      }
    } else if(profileStatus === "failed"){
      dispatch(backToIdle());
      if(!doUna) {
        dispatch(doOnce());
        dispatch(setScanned(false));
        navigation.navigate("Login",  { qrUpdatedFlag: true });
        showMessage({
          message: "Your session has expired.",
          description: "Your QR code has been renewed. Please, log in in the aplication again again.",
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
        source={require("./assets/icon.png")}
      />
      <Text style={styles.loadingText}>Loading...</Text>
      <BackgroundTask
              interval={300000}
              function={() => {
                if (AsyncStorage.getItem("userId") !== null && AsyncStorage.getItem("userId") !== undefined && AsyncStorage.getItem("userId") != "" ){
                  let prevFriends = getFriendsNames();
                dispatch(fetchFriends());
                let newFriends = getFriendsNames().filter(friend => !(prevFriends.includes(friend)));
                if (newFriends.length > 0)
                schedulePushNotificationFriends(newFriends);
                }
              }}
            />
      <BackgroundTask
              interval={60000}
              function={() => {
                if (AsyncStorage.getItem("userId") !== null && AsyncStorage.getItem("userId") !== undefined && AsyncStorage.getItem("userId") != "" ){
                let prevFriends = onlineCloseFriends;
                dispatch(fetchFriendsWithDistance());
                let newFriends = new Array();
                if (onlineCloseFriends !== null && onlineCloseFriends !== undefined && Array.from(Object.keys(onlineCloseFriends)).length > 0)
                  newFriends = Array.from(Object.keys(onlineCloseFriends)).filter(friend => !(Array.from(Object.keys(prevFriends)).includes(friend)));
                if (newFriends.length > 0)
                schedulePushNotificationFriendsClose(newFriends);
                }
              }}
            />
    </View>
    </ImageBackground>
    </View>
  );
}



