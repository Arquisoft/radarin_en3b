import React from "react";
import { View, Text, ScrollView, Image, Button, BackHandler, Pressable, TouchableOpacity, Share, Linking} from "react-native";
import { Card } from "react-native-elements";
import {DataTable} from "react-native-paper";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import MyOverlay from "./MyAddingLocations";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { getFriendsNames } from './FetchFriends';
import { getLocationAsync } from "./GetAsyncLocation";

export default function HomeScreen({ navigation }) {

  const onlineFriends = useSelector(state => state.user.onlineFriends);
  const loadedFriends = useSelector(state => state.user.onlineCloseFriends);
  const friendsNames = getFriendsNames(onlineFriends);
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

  const MyCloseFriendsCard = () => {
    if (loadedFriends == "No location"){
      return (
       <Card containerStyle={styles.nofriendscard}>
       <Card.Title style={styles.cardTitle}>Your location is not being taken</Card.Title>
       <Card.Divider style={styles.divider} />
       <Text style={styles.name}>Please, go to your profile and activate automatic location sending</Text>
   
       <View style={styles.cardButton}>
         <Button color="#094072" title="Go to profile" onPress={() => {
           navigation.navigate("Profile");
         }
         }>
           Go to profile
         </Button>
       </View>
     </Card>
      );
    } else if (loadedFriends !== null && loadedFriends !== undefined && Object.entries(loadedFriends)?.length > 0) {
      return (
        <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Friends close to your location</Card.Title>
        <Card.Divider style={styles.divider} />
        <DataTable>
          {
            Object.entries(loadedFriends).map(([u, d]) => {
              return (
                <DataTable.Row key={u} onPress={() => Linking.openURL(d.mapsUrl)}>
                  <DataTable.Cell style={{ flex: 2 }}><Text style={styles.name}>{u}</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.name}>{d.value} m</Text></DataTable.Cell>
                </DataTable.Row>
              );
            })
          }

        </DataTable>
      </Card>
      );
    } else {
      return (
        <Card containerStyle={styles.nofriendscard}>
          <Card.Title style={styles.cardTitle}>Wops, you don't have any friend close to you right now</Card.Title>
          <Card.Divider style={styles.divider} />
          <Text style={styles.name}>Keep moving, you may find someone soon :)</Text>
        </Card>
      );
    }
   }

   const shareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "Hello, I'm using Radarin, would you like to try and join? https://radarinen3bwebapp.herokuapp.com/",
      });
    } catch (error) {
      alert(error.message);
    }
  };

   const MyFarFriendsCard = () => {
    if(friendsNames.length == 0){
      return (
        <Card containerStyle={styles.nofriendscard}>
          <Card.Title style={styles.cardTitle}>Seems like you don't have any friend that uses Radarin.</Card.Title>
          <Card.Divider style={styles.divider} />
          <Text style={styles.name}>Would you like to invite them?</Text>
          <TouchableOpacity style={styles.sharebutton}  onPress={shareApp}>
          <Image source={require("./assets/share.png")} style={styles.icon} />
          </TouchableOpacity>
        </Card>
       );
    } else if (loadedFriends !== null && loadedFriends !== undefined && Object.entries(loadedFriends)?.length > 0){
      return (
        <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}>Disconnected or far from you</Card.Title>
        <Card.Divider style={styles.divider} />
        <DataTable>
          {
            friendsNames.filter(f => !(f in loadedFriends)).map((u) => {
              return (
                <DataTable.Row key={u}>
                  <DataTable.Cell><Text style={styles.name}>{u}</Text></DataTable.Cell>
                </DataTable.Row>
              );
            })
          }

        </DataTable>
      </Card>
       );
     } else {
       return (
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Friends</Card.Title>
          <Card.Divider style={styles.divider} />
          <DataTable>
            {
              friendsNames.map((u) => {
                return (
                  <DataTable.Row key={u}>
                    <DataTable.Cell><Text style={styles.name}>{u}</Text></DataTable.Cell>
                  </DataTable.Row>
                );
              })
            }

          </DataTable>
        </Card>
       );
     }
   }

    return (
      <View style={styles.homeScreenContainer}>
      <ScrollView>
      <View style={styles.mainScreenContainer}>
        <MyCloseFriendsCard></MyCloseFriendsCard>
        <MyFarFriendsCard></MyFarFriendsCard>
      </View>
      </ScrollView>
      <MyOverlay/>
      </View>
    );

}