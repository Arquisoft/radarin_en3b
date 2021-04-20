import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends, fetchFriendsWithDistance, backToIdle, doOnce } from "./redux/slices/userSlice";
import BackgroundTask from "./FetchFriendsBackground";

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useState, useRef } from 'react';
import {Platform } from 'react-native';
import { getFriendsNames } from "./FetchFriends";

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;

  const webId = id.replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const closeFriendsStatus = useSelector(state => state.user.closeFriendsStatus);
  const doUna = useSelector(state => state.user.doOnce);
  const onlineCloseFriends = useSelector(state => state.user.onlineCloseFriends);
  const onlineFriends = useSelector(state => state.user.onlineFriends);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle" && profileStatus === "succeeded") {
      dispatch(fetchFriends(webId));
    } else if (closeFriendsStatus === "idle" && friendsStatus === "succeeded") {  
      dispatch(fetchFriendsWithDistance()); 
    } else if (closeFriendsStatus === "succeeded") {
      navigation.navigate("Radarin");
    } else if(friendsStatus === "failed"){
      dispatch(backToIdle());
      if(!doUna) {
        dispatch(doOnce());
        navigation.navigate("Login",  { qrUpdatedFlag: true });
      }
    }

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  });

  async function schedulePushNotificationFriendsClose( newFriends ) {
    let friendsStr = "";
    if (newFriends.length == 1){
      friendsStr += (f + " is now close to you")
    } else {
      for (let i = 0; i < newFriends.length -3; i++)
          friendsStr += (newFriends[i] + ", ");
      
      friendsStr += (newFriends[newFriends.length -2] + " and ");
      friendsStr += (newFriends[newFriends.length -1] + " are now close to you.");

    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New friends are close to you!",
        body: friendsStr,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  async function schedulePushNotificationFriends( newFriends ) {
    let friendsStr = "";

    if (newFriends.length == 1){
      friendsStr += (f + " has started to use the app.")
    } else {
      for (let i = 0; i < newFriends.length -3; i++)
          friendsStr += (newFriends[i] + ", ");
      
      friendsStr += (newFriends[newFriends.length -2] + " and ");
      friendsStr += (newFriends[newFriends.length -1] + " have started to use the app.");

    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New friends have joined Radarin!",
        body: friendsStr,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

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
                let prevFriends = getFriendsNames();
                dispatch(fetchFriends());
                let newFriends = getFriendsNames().filter(friend => !(prevFriends.includes(friend)));
                if (newFriends.length > 0)
                schedulePushNotificationFriends(newFriends);
              }}
            />
      <BackgroundTask
              interval={60000}
              function={() => {
                let prevFriends = onlineCloseFriends;
                dispatch(fetchFriendsWithDistance());
                let newFriends = Array.from(Object.keys(onlineCloseFriends)).filter(friend => !(Array.from(Object.keys(prevFriends)).includes(friend)));
                if (newFriends.length > 0)
                schedulePushNotificationFriendsClose(newFriends);
              }}
            />
    </View>
    </ImageBackground>
    </View>
  );
}



