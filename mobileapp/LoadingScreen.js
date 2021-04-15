import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends, fetchFriendsWithDistance, backToIdle, doOnce } from "./redux/slices/userSlice";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const TASK_NAME = "friendsLocation";
  TaskManager.defineTask(TASK_NAME, executeTask);

  function executeTask(){
    try {
      const receivedNewData = "fetchFriendsWithDistance()";
      console.log("My task ", receivedNewData);
      return receivedNewData;
    } catch (err) {
      return;
    }
  }

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;

  const webId = JSON.stringify(id).replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const closeFriendsStatus = useSelector(state => state.user.closeFriendsStatus);
  const doUna = useSelector(state => state.user.doOnce);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle" && profileStatus === "succeeded") {
      dispatch(fetchFriends(webId));
    } else if (closeFriendsStatus === "idle" && friendsStatus === "succeeded") {  
      dispatch(fetchFriendsWithDistance());
      try {
        BackgroundFetch.registerTaskAsync(TASK_NAME).then(async ()=>{console.log("Task registered"); await BackgroundFetch.setMinimumIntervalAsync(TASK_NAME);});
        
      } catch (err) {
        console.log("Task Register failed:", err)
      }  
    } else if (closeFriendsStatus === "succeeded") {
      navigation.navigate("Radarin");
    } else if(friendsStatus === "failed"){
      dispatch(backToIdle());
      if(!doUna) {
        dispatch(doOnce());
        navigation.navigate("Login",  { qrUpdatedFlag: true });
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
    </View>
    </ImageBackground>
    </View>
  );
}



