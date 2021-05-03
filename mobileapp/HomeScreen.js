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
import { refreshFriends } from "./redux/slices/userSlice";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { schedulePushNotificationFriends, schedulePushNotificationFriendsClose} from "./SetNotifications";


let dispatch;
let friends;
let prevfriends;

TaskManager.defineTask("friends", () => {
  try {
    const taskToExecute = () => {
      console.log("Entra en la tarea");
      if (AsyncStorage.getItem("userId") !== null && AsyncStorage.getItem("userId") !== undefined && AsyncStorage.getItem("userId") != "" ){

        if (dispatch !== undefined) {
          dispatch(refreshFriends());
        
          if (friends != "No location"){
            let newFriends = friends.filter(friend => !(prevfriends.some(f=>friend.webId===f.webId)));
            console.log(newFriends);
            
            if (newFriends.length > 0)
              schedulePushNotificationFriends(newFriends);

              console.log("Background fetch friends executed");

            let newCloseFriends = friends.filter(f => f.isClose).filter(friend => !(prevfriends.filter(f => f.isClose).some(f=>friend.webId===f.webId)));
              
            if (newCloseFriends.length > 0){
              schedulePushNotificationFriendsClose(newCloseFriends);
            }
            console.log("Background fetch locations executed");
  
          }
        }
      }
  
          return "Executed correctly";
      
    }
    const receivedNewData = taskToExecute();// do your background fetch here
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
  prevfriends = useSelector(state => state.user.prevfriends);

  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      registerTaskAsync();
    }
    AsyncStorage.getItem("firstLogin").then((login) => { 
      if(login === null || login === "true")
        setFirstLogin(true);
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
      {firstLogin && <MyOverlaySupport /> }
      <MyOverlay visibility={true} firstLogin={firstLogin}/>

    </View>
  );

}