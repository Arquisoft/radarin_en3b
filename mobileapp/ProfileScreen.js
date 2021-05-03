
import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DataTable, Avatar } from "react-native-paper";
import * as Location from "expo-location";
import { HeaderBackButton } from "@react-navigation/stack";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { useSelector } from "react-redux";
import MySwitch from "./MySwitch";


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
        <HeaderBackButton tintColor={"#FFF"} onPress={() => { navigation.navigate("Radarin"); }}></HeaderBackButton>
      )
      )
    });
  }, [navigation]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
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
            <DataTable.Cell><Avatar.Text size={45} label={fn.substr(0, 1)} backgroundColor="#126BBD" /></DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}><Card.Title style={styles.cardTitle}>{fn}</Card.Title></DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <Text style={styles.username}>{webId}</Text>

        <Card.Divider style={styles.divider} />

        <Card.Title style={styles.cardTitle}>Settings</Card.Title>

        <DataTable>
          <DataTable.Row>
            <DataTable.Cell style={{ flex: 3 }}><Text style={styles.name}>Get location automatically:</Text></DataTable.Cell>
            <DataTable.Cell><MySwitch /></DataTable.Cell>
          </DataTable.Row>
        </DataTable>

      </Card>
    </View>
  );
}