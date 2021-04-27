import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Button, BackHandler, Pressable, TouchableOpacity, Share} from "react-native";
import { Card, Overlay } from "react-native-elements";
import {DataTable} from "react-native-paper";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { getFriendsNames } from './FetchFriends';
import { getLocationAsync } from "./GetAsyncLocation";
import { TextInput } from "react-native";
import {fetchFriendsWithDistance} from "./redux/slices/userSlice";
import { useDispatch} from "react-redux";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriendsWithDistance()); 
  });

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
      <MyOverlay></MyOverlay>
      </View>
    );

}

const MyOverlay = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  

  return(
    <View style={styles.homeScreenContainer}>
    <MyPressable onPressing={toggleOverlay}></MyPressable>
    <Overlay  isVisible={visible} onBackdropPress={toggleOverlay}>
      <MyForm></MyForm>
    </Overlay> 
    </View>)
}

const MyForm = () => {

  return(
    <ScrollView > 
      <Card containerStyle={styles.formCard}>
          <Text style={styles.cardTitle}>Title</Text>
          <TextInput placeholder="Title of the ubication" label="Title" style = {styles.titleForm}></TextInput>
          <Card.Divider style={styles.divider} />
          <Text style={styles.cardTitle}>Comment</Text>
          <View style = {styles.commentView}>
          <TextInput placeholder="Comment here..." label = "Comment" style = {styles.commentForm} multiline={true} ></TextInput>
          </View>
          <Button color='#094072' title="Send location"></Button>
          <Card.Divider style={styles.divider} />
          <Button color='#094072' title="Send location with photo"></Button>
        </Card>
       
    </ScrollView>
  )
}

/*
<TextInput placeholder="Title of the ubication" label="Title" style = {styles.titleForm}></TextInput>
        <TextInput placeholder="Comment here..." label = "Comment" style = {styles.commentForm}></TextInput>
*/

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
