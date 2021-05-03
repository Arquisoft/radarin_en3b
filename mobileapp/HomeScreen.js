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
import { useDispatch } from "react-redux";

export default function HomeScreen({ navigation }) {
  const [firstLogin, setFirstLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
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