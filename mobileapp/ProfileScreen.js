import React, {useState, useEffect} from "react";
import { View, Text, Button} from "react-native";
import { Card} from "react-native-elements";
import {Switch } from "react-native-paper";
import { DataTable, Avatar } from "react-native-paper";
import {HeaderBackButton} from "@react-navigation/stack";
import * as Location from "expo-location";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { sendLocation } from "./SendLocation";
import { useSelector } from "react-redux";

let savedLocation;

export function getLocation(){
  //Temporal until get works
  savedLocation = { id: 2, coordinates: [43.5410052978, -5.66364853752], name: "Gijón", details: "Location #2" };

  return savedLocation;
}
export default function ProfileScreen({navigation}) {
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
      let {status} = await Location.requestPermissionsAsync();
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
                <DataTable.Cell><Avatar.Text size={45} label={fn.substr(0, 1)} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Card.Title style={styles.cardTitle}>{fn}</Card.Title></DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Text style={styles.username}>{webId}</Text>
            
            <Card.Divider/>

            <Card.Title>Settings</Card.Title>

            <DataTable>
            <DataTable.Row>
                <DataTable.Cell style={{flex: 3}}>Get location automatically:</DataTable.Cell>
                <DataTable.Cell><MySwitch onToggleSwitch={() =>{
                  if (this.MySwitch.isSwitchOn) {
                    Location.stopLocationUpdatesAsync("LocationTask");
                    alert("This is on");
                  } else {
                    alert("This is off");
                    Location.startLocationUpdatesAsync("LocationTask");
                  }
                    }}></MySwitch></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>
                <Button color="#3f51b5" title="Get my position" onPress={() =>{
                        Location.requestPermissionsAsync();
                        if (location.coords !== null) {
                          savedLocation = location;
                          sendLocation(location.coords, location.timestamp);
                        }
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
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch color="#3f51b5" value={isSwitchOn} onValueChange={onToggleSwitch} />;
};