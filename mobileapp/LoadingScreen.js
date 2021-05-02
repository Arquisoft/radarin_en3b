import React, { useEffect, useState } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends, fetchFriendsWithDistance, backToIdle} from "./redux/slices/userSlice";
import { doOnce, doOnceNotifications} from "./redux/slices/executingSlice";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { setScanned } from "./redux/slices/executingSlice";
import { showMessage} from "react-native-flash-message";

import { getFriendsNames } from "./FetchFriends";
import { setNotificationsBackground, schedulePushNotificationFriends, schedulePushNotificationFriendsClose} from "./SetNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

let onlineCloseFriends;
let onlineFriends;
let dispatch;

TaskManager.defineTask("friendsFromPod", () => {
  try {
    const taskToExecute = () => {
      if (AsyncStorage.getItem("userId") !== null && AsyncStorage.getItem("userId") !== undefined && AsyncStorage.getItem("userId") != "" ){
        let prevFriends = getFriendsNames(onlineFriends);
      dispatch(fetchFriends());
      let newFriends = getFriendsNames(onlineFriends).filter(friend => !(prevFriends.includes(friend)));
      if (newFriends.length > 0)
        schedulePushNotificationFriends(newFriends);

        console.log("Background fetch friends executed");

        return "Executed correctly";
      }
    }
    const receivedNewData = taskToExecute();// do your background fetch here
    return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});

TaskManager.defineTask("friendsLocation", () => {
  try {
    const taskToExecute = () => {
      if (AsyncStorage.getItem("userId") !== null && AsyncStorage.getItem("userId") !== undefined && AsyncStorage.getItem("userId") != "" ){
        let prevFriends = onlineCloseFriends;
        if (dispatch !== undefined)
          dispatch(fetchFriendsWithDistance());
        let newFriends = new Array();
        if (onlineCloseFriends !== null && onlineCloseFriends !== undefined && Array.from(Object.keys(onlineCloseFriends)).length > 0)
          newFriends = Array.from(Object.keys(onlineCloseFriends)).filter(friend => !(Array.from(Object.keys(prevFriends)).includes(friend)));
        if (newFriends !== undefined && newFriends !== null && newFriends.length > 0){
          schedulePushNotificationFriendsClose(newFriends);
        }
          
        }

        return "Executed correctly";
    }

    const receivedNewData = taskToExecute();// do your background fetch here
    return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    console.log("Error" + error)
    return BackgroundFetch.Result.Failed;
  }
});


const registerTaskAsync = async () => {
    await (BackgroundFetch.registerTaskAsync(
      "friendsFromPod",
        {
          minimumInterval: 30,
          stopOnTerminate: false,
          startOnBoot: true,
        },
    ).then(() => BackgroundFetch.setMinimumIntervalAsync(30)));

    await (BackgroundFetch.registerTaskAsync(
      "friendsLocation",
        {
          minimumInterval: 10,
          stopOnTerminate: false,
          startOnBoot: true,
        },
    ).then(() => BackgroundFetch.setMinimumIntervalAsync(10)));
};

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;
  const webId = id.replace(/['"]+/g, '');
  dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const closeFriendsStatus = useSelector(state => state.user.closeFriendsStatus);
  const doUna = useSelector(state => state.executing.doOnce);
  const doUnaNots = useSelector(state => state.executing.doOnceNotifications);
  onlineCloseFriends = useSelector(state => state.user.onlineCloseFriends);
  onlineFriends = useSelector(state => state.user.onlineFriends);

  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {

    setIsMounted(true);
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle" && profileStatus === "succeeded") {
      dispatch(fetchFriends(webId));
    } else if (closeFriendsStatus === "idle" && friendsStatus === "succeeded") {  
      dispatch(fetchFriendsWithDistance()); 
    } else if (closeFriendsStatus === "succeeded") {
      if(!doUnaNots) {
        dispatch(doOnceNotifications());
        dispatch(doOnce());
        setNotificationsBackground();
      }
      
      navigation.navigate("Radarin");

    } else if(friendsStatus === "failed" || closeFriendsStatus === "failed"){
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

  if (isMounted){
    registerTaskAsync();
  }

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



