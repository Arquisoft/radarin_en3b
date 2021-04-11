import React from "react";
import { View, Text, ScrollView, Image, Button, BackHandler} from "react-native";
import { Card } from "react-native-elements";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

{/*Esto debería ir en el return delante de Navigation container pero.. cosas raras con comentarios
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{navigation.navigate('Post')}}
        style={styles.touchableOpacityStile}>
          <Image style={styles.icon} source={require("./assets/add-24px.png")}/>
    </TouchableOpacity>*/}


export default function HomeScreen({navigation}) {

  const loadedFriends = useSelector(state => state.user.onlineCloseFriends);

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
          <Card.Title>You haven't send any location yet</Card.Title>
          <Card.Divider />
          <Text style={styles.name}>Please, go to your profile and activate the atomatic location sending or send it manually at least once</Text>
          
          <View style={styles.cardButton}>
            <Button color="#3f51b5" title="Go to profile" onPress={() =>{
                navigation.navigate("Profile");
              }  
            }>Go to profile
            </Button>
          </View>     
        </Card>
      </View>
    );
  }

  if (Object.entries(loadedFriends).length > 0){
    return (
      <ScrollView>
        <View style={styles.mainScreenContainer}>
          <Text style={styles.normalText}>Friends close to your location:</Text>
          <View>
            {
              Object.entries(loadedFriends).map(([u, d]) => {
                return (
                  <Card containerStyle={styles.card} key={u}>
                    <Card.Title>{u}</Card.Title>
                    <Card.Divider />
                    <Text style={styles.name}>{d} m</Text>
                  </Card>
                );
              })
            }
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.mainScreenContainer}>
        <Card containerStyle={styles.nofriendscard}>
                  <Card.Title>Wops, you don't have any friend close to you right now</Card.Title>
                  <Card.Divider />
                  <Text style={styles.name}>Keep moving, you may find someone soon :)</Text>
        </Card>
      </View>
    );
  }
}
