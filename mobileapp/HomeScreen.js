import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Button, BackHandler, Pressable} from "react-native";
import { Card, Overlay } from "react-native-elements";
import {DataTable} from "react-native-paper";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { getFriendsNames } from './FetchFriends';
import { getLocationAsync } from "./GetAsyncLocation";


export default function HomeScreen({navigation}) {

  const loadedFriends = useSelector(state => state.user.onlineCloseFriends);
  const friends = getFriendsNames();
  getLocationAsync();

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
            source={require("./assets/icon.png")}
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

  if(loadedFriends == "No location"){
    return (
      <View style={styles.mainScreenContainer}>
        <Card containerStyle={styles.nofriendscard}>
          <Card.Title style={styles.cardTitle}>You haven't send any location yet</Card.Title>
          <Card.Divider style={styles.divider}/>
          <Text style={styles.name}>Please, go to your profile and activate the atomatic location sending or send it manually at least once</Text>
          
          <View style={styles.cardButton}>
            <Button color="#094072" title="Go to profile" onPress={() =>{
                navigation.navigate("Profile");
              }  
            }>Go to profile
            </Button>
          </View>    
        </Card>
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>Disconnected or far from you</Card.Title>
            <Card.Divider style={styles.divider}/>
              <DataTable>
              {
                friends.map((u) => {
                  return (
                    <DataTable.Row key={u}>
                      <DataTable.Cell><Text style={styles.name}>{u}</Text></DataTable.Cell>
                    </DataTable.Row>
                  );
                })
              }
              
            </DataTable>
        </Card>
        <MyOverlay></MyOverlay>
      </View>
    );
  }

  if (Object.entries(loadedFriends).length > 0){
    return (
      <View style={styles.homeScreenContainer}>
      <ScrollView>
        <View style={styles.mainScreenContainer}>
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>Friends close to your location</Card.Title>
            <Card.Divider style={styles.divider}/>
              <DataTable>
              {
                Object.entries(loadedFriends).map(([u, d]) => {
                  return (
                    <DataTable.Row key={u}>
                      <DataTable.Cell style={{flex : 2}}><Text style={styles.name}>{u}</Text></DataTable.Cell>
                      <DataTable.Cell><Text style={styles.name}>{d} m</Text></DataTable.Cell>
                    </DataTable.Row>
                  );
                })
              }
              
            </DataTable>
      </Card>
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>Disconnected or far from you</Card.Title>
            <Card.Divider style={styles.divider}/>
              <DataTable>
              {
                friends.filter(f => !(f in loadedFriends)).map((u) => {
                  return (
                    <DataTable.Row key={u}>
                      <DataTable.Cell><Text style={styles.name}>{u}</Text></DataTable.Cell>
                    </DataTable.Row>
                  );
                })
              }
              
            </DataTable>
        </Card>
        </View>
      </ScrollView>
      <MyOverlay></MyOverlay>
      </View>
    );
  } else {
    return (
      <View style={styles.mainScreenContainer}>
        <Card containerStyle={styles.nofriendscard}>
                  <Card.Title style={styles.cardTitle}>Wops, you don't have any friend close to you right now</Card.Title>
                  <Card.Divider style={styles.divider}/>
                  <Text style={styles.name}>Keep moving, you may find someone soon :)</Text>
        </Card>
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>Disconnected or far from you</Card.Title>
            <Card.Divider style={styles.divider}/>
              <DataTable>
              {
                friends.map((u) => {
                  return (
                    <DataTable.Row key={u}>
                      <DataTable.Cell><Text style={styles.name}>{u}</Text></DataTable.Cell>
                    </DataTable.Row>
                  );
                })
              }
              
            </DataTable>
        </Card>
        <MyOverlay></MyOverlay>
      </View>
    );
  }
}

const MyOverlay = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  

  return(
    <View>
    <MyPressable onPressing={toggleOverlay}></MyPressable>
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <Text>Hello from Overlay!</Text>
    </Overlay> 
    </View>)
}

const MyPressable = ({onPressing}) => {
  
  const myStyle = ({ pressed }) => [
    {
      backgroundColor: pressed
        ? 'rgb(210, 230, 255)'
        : '#094072'
    },
    styles.pressable
  ];


  return <Pressable activeOpacity={0.7} style={myStyle} onPress={() => onPressing()}>
  <Image style={styles.icon} source={require("./assets/add-24px.png")}/>
</Pressable >
};
