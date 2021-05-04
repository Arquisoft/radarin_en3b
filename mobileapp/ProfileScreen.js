import React, { useEffect } from "react";
import { View, Text, BackHandler } from "react-native";
import { Card } from "react-native-elements";
import { DataTable, Avatar } from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/stack";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { useDispatch, useSelector } from "react-redux";
import MySwitch from "./MySwitch";
import { useFocusEffect } from '@react-navigation/native';
import { setRefreshPrevented } from "./redux/slices/userSlice";


export default function ProfileScreen({ navigation }) {
  const webId = useSelector(state => state.user.webId);
  const fn = useSelector(state => state.user.fn);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
        <MyMenu navigation={navigation}></MyMenu>
      )
      ),
      headerLeft: (() => (
        <HeaderBackButton tintColor={"#FFF"} onPress={() => { navigation.navigate("Radarin"); dispatch(setRefreshPrevented(false)); }}></HeaderBackButton>
      )
      )
    });
  }, [navigation]);

  useEffect(() => {
    console.log("entra");
    dispatch(setRefreshPrevented(true));
  });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log("happens2");
        dispatch(setRefreshPrevented(false));
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

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