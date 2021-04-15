import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends, fetchFriendsWithDistance } from "./redux/slices/userSlice";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const TASK_NAME = "friendsLocation";

      TaskManager.defineTask(TASK_NAME, () => {
        try {
          const receivedNewData = fetchFriendsWithDistance();
          console.log("My task ", receivedNewData);
          return receivedNewData;
        } catch (err) {
          return;
        }
      });

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;
  const webId = JSON.stringify(id).replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const closeFriendsStatus = useSelector(state => state.user.closeFriendsStatus);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle") {
      dispatch(fetchFriends(webId));
    } else if (closeFriendsStatus === "idle" && friendsStatus === "succeeded") {  
      dispatch(fetchFriendsWithDistance());
      
      try {
        BackgroundFetch.registerTaskAsync(TASK_NAME).then(()=>console.log("Task registered"))
        
      } catch (err) {
        console.log("Task Register failed:", err)
      }
      
    } else if (closeFriendsStatus === "succeeded") {
      navigation.navigate("Radarin");
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



