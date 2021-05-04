import React, { useEffect, useState } from "react";
import {  Image } from "react-native";
import { View, Text, Button, Linking, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MyStyles";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as SecureStore from "expo-secure-store";
import { setScanned } from "./redux/slices/executingSlice";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLocationEnabled } from "./redux/slices/LocationsSlice";
import { backToIdle } from "./redux/slices/userSlice";

export default function LoginScreen({ navigation, route }) {

  const dispatch = useDispatch();
  const { qrUpdatedFlag, showSc } = route.params;
  const scanned = useSelector(state => state.executing.scanned);

    /*AsyncStorage.getItem("userId").then(function (webId){
      if (webId != null && webId != "" && !qrUpdatedFlag){
        console.log("no me veas por favor");
        navigation.navigate("Loading", {id: webId });
      }
    });*/

    useEffect(() => {
      AsyncStorage.getItem("locationStatus").then((response) => {
        if(response === null)
          dispatch(changeLocationEnabled(false));
        else
          dispatch(changeLocationEnabled(response));
      });
      AsyncStorage.getItem("userId").then(function (webId){
        if (webId != null && webId != "" && !qrUpdatedFlag){
          navigation.navigate("Loading", {id: webId });
        }
      });
    },[]);
    
  
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [showScanner, setShowScanner] = useState(showSc);
  
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (() => (
        <View style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require("./assets/icon_small.png")}
          />
        </View>
      )),
    }),
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasCameraPermission(status == "granted");
      })();
  }, [navigation]);
  
  const handleQrScanned = async ({ type, data }) => {
    try{
    await save("op234iyu5v6oy234iuv6", data);
    const parsed = JSON.parse(data);
    const webId = parsed.webId;
    dispatch(setScanned(true));
    
    AsyncStorage.setItem("userId",webId);
    AsyncStorage.setItem("firstLogin","true");
    dispatch(backToIdle());
    navigation.navigate("Loading", {id: webId });
    }catch(err){
      setShowScanner(false);
      showMessage({
        message: "The QR code you read was not valid",
        description: "Please, try again with a different QR",
        type: "danger",
        duration: 5000,
      });
    }
  };

  function changeShowScanner() {
    setShowScanner(true);
  }

  if (showScanner) {
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleQrScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.signinCardTitle}>Sign in</Card.Title>
          <Card.Divider style={styles.divider}/>
          <Text style={styles.normalText}>Click the button and scan the QR:</Text>
          <Text style={styles.smallText}>Don't have the QR? You can get it here: <Text style={{ color: "#126BBD" }} onPress={() => { Linking.openURL("https://inrupt.com/"); }}> Inrupt </Text> </Text>
          <View style={styles.cardButton}>
            <Button color="#094072" title="Scan" onPress={changeShowScanner}>Scan</Button>
          </View>
        </Card>
      </View>
    );
  }
}