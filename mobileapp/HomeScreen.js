import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, BackHandler } from "react-native";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { useFocusEffect } from '@react-navigation/native';
import MyOverlaySupport from "./MyFirstTour";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyCloseFriendsCard from "./HomeComponents/MyCloseFriendsCard";
import MyFarFriendsCard from "./HomeComponents/MyFarFriendsCard";
import MyOverlay from "./HomeComponents/MyOverlay";
import { useDispatch, useSelector } from "react-redux";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { schedulePushNotificationFriends, schedulePushNotificationFriendsClose} from "./SetNotifications";
import { getLocationAsyncStatus, startLocationAsync } from "./GetAsyncLocation";
import {getFriends} from "./FetchFriends";

let friends;

TaskManager.defineTask("friends", async () => {
  try {
    const taskToExecute = async () => {
      console.log("Entra en la tarea");
      if (AsyncStorage.getItem("userId") !== null && AsyncStorage.getItem("userId") !== undefined && AsyncStorage.getItem("userId") != "" ){

        if (friends !== undefined && friends !== null) {

          let friendsUpdated = await getFriends(await AsyncStorage.getItem("userId"));

          console.log(friends);
          console.log(friendsUpdated);
          
          if (friends.length > 0 && friends[0].distance != "No location"){
            
            if (friendsUpdated.length > friends.length)
              schedulePushNotificationFriends();

              console.log("Background fetch friends executed");

            let closeFriends = friendsUpdated.filter(f => f.isClose);
            let oldCloseFriends = friends.filter(f => f.isClose);
            
            if (closeFriends.length > oldCloseFriends.length){
              schedulePushNotificationFriendsClose();
            }
            console.log("Background fetch locations executed");
          }

          friends = friendsUpdated;
        }
      }
  
          return "Executed correctly";
      
    }
    const receivedNewData = await taskToExecute();// do your background fetch here
    return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});


const registerTaskAsync = async () => {
    await (BackgroundFetch.registerTaskAsync(
      "friends",
        {
          minimumInterval: 30,
          stopOnTerminate: false,
          startOnBoot: true,
        },
    ).then(() => BackgroundFetch.setMinimumIntervalAsync(30)));
    console.log("la tarea se ha registrado")
};

export default function HomeScreen({ navigation }) {
  const [firstLogin, setFirstLogin] = useState(false);

  let isMounted = false; 
  dispatch = useDispatch();
  friends = useSelector(state => state.user.friends);
  let locations = useSelector(state => state.locations.getLocationEnabled);

  useEffect(() => {
    
    if (!isMounted) {
      isMounted = true;
      registerTaskAsync();
    }

    getLocationAsyncStatus().then(value => {
      if (!value){
        if (locations){
          startLocationAsync();
        }
      }
    });


    AsyncStorage.getItem("firstLogin").then((login) => { 
      if(login === null || login === "true"){
        setFirstLogin(true);
        AsyncStorage.setItem("firstLogin", "false");
      }
      else 
        setFirstLogin(false);
    });
  }, []);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
        <MyMenu navigation={navigation}></MyMenu>
      )
      ),
      headerLeft: (() => (
        <View style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require("./assets/icon_small.png")}
          />
        </View>
      )
      ),
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  return (
    <View style={styles.homeScreenContainer}>
      <ScrollView>
        <View style={styles.mainScreenContainer}>
          <MyCloseFriendsCard navigation={ navigation }/>
          <MyFarFriendsCard />
        </View>
      </ScrollView>
      {firstLogin ? <MyOverlaySupport /> : null}
      <MyOverlay visibility={true} firstLogin={firstLogin}/>

    </View>
  );

}