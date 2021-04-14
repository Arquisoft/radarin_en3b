
import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Card } from "react-native-elements";
import { Switch } from "react-native-paper";
import { DataTable, Avatar } from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/stack";
import * as Location from "expo-location";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
//import { sendLocation } from "./SendLocation";
import { useSelector } from "react-redux";
import {getLocation, getLocationAsync} from "./GetAsyncLocation";
import AsyncStorage from "@react-native-community/async-storage";


export default function ProfileScreen({ navigation }) {
  const webId = useSelector(state => state.user.webId);
  const fn = useSelector(state => state.user.fn);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
            <MyMenu navigation={navigation}></MyMenu>
          )
      ),
      headerLeft: (() => (
        <HeaderBackButton tintColor={"#FFF"} onPress={() => {navigation.navigate("Radarin");}}></HeaderBackButton>
      )
      )
    });
  }, [navigation]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      if (!Location.hasStartedLocationUpdatesAsync("LocationTask")) {
        setErrorMsg("Please, turn on your location");
        return;
      } else {
        setErrorMsg(false);
      }

      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
    })();

  }
    , []);

  let text = "Waiting for having a valid position...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location, null, "\t");
  }
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Text size={45} label={fn.substr(0, 1)} backgroundColor="#126BBD"/></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Card.Title style={styles.cardTitle}>{fn}</Card.Title></DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Text style={styles.username}>{webId}</Text>
            
            <Card.Divider style={styles.divider}/>

            <Card.Title style={styles.cardTitle}>Settings</Card.Title>

            <DataTable>
            <DataTable.Row>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Get location automatically:</Text></DataTable.Cell>
                <DataTable.Cell><MySwitch></MySwitch></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>
                <Button color="#094072" title="Get my position" onPress={() =>{
                        /*Location.requestPermissionsAsync();

                        if (location.coords !== null) {
                          savedLocation = location;
                          sendLocation(location.coords, location.timestamp);
                        }

                        alert(text); */ 
                        alert(getLocation());
                      } 
                        }>Get My Position
                </Button>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>

      </Card>
    </View>
  );
}


const MySwitch = () => {
  let initialState;
  AsyncStorage.getItem("backgroundLocations").then((backgroundLocation) => {
    if (backgroundLocation === "active") 
      setIsSwitchOn(true);
    
    else  
      setIsSwitchOn(false);
    getLocationAsync();
  });
  const [isSwitchOff, setIsSwitchOn] = React.useState(initialState);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOff);
    if (isSwitchOff) 
        AsyncStorage.setItem("backgroundLocations", "inactive");
    else 
        AsyncStorage.setItem("backgroundLocations", "active");
    
    getLocationAsync();
  }

  return <Switch color="#094072" value={isSwitchOff} onValueChange={onToggleSwitch} />;
};