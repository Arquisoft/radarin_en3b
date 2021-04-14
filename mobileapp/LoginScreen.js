import React, { useState } from "react";
import {  Image } from "react-native";
import { View, Text, Button, Linking, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import styles from "./MyStyles";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-community/async-storage";

export default function LoginScreen({ navigation, route }) {

  const { qrUpdatedFlag } = route.params;

  console.log(qrUpdatedFlag);

    AsyncStorage.getItem("userId").then(function (webId){
      if (webId != null && webId != "" && !qrUpdatedFlag){
        navigation.navigate("Loading", {id: webId});
      }
    });
    
  
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (() => (
        <View style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require("./assets/icon.png")}
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
    setScanned(true);
    await save("op234iyu5v6oy234iuv6", data);
    const parsed = JSON.parse(data);
    const webId = parsed.webId;
    AsyncStorage.setItem("userId",webId);
    navigation.navigate("Loading", {id: webId});
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