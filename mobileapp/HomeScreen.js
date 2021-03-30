import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Card } from "react-native-elements";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import { useSelector } from "react-redux";

{/*Esto debería ir en el return delante de Navigation container pero.. cosas raras con comentarios
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{navigation.navigate('Post')}}
        style={styles.touchableOpacityStile}>
          <Image style={styles.icon} source={require("./assets/add-24px.png")}/>
    </TouchableOpacity>*/}


export default function HomeScreen({navigation}) {

  const loadedFriends = useSelector(state => state.user.onlineFriends);

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

  return (
    <ScrollView>
      <View style={styles.mainScreenContainer}>
        <Text style={styles.normalText}>Friends close to your location:</Text>
        <View>

                {
                    loadedFriends.map((u) => {
                      return (
                        <Card containerStyle={styles.card} key={u}>
                          <Card.Title>{u}</Card.Title>
                          <Card.Divider />
                          <Text style={styles.name}>1 km</Text>
                        </Card>
                      );
                    })
                  }
              </View>
      </View>
    </ScrollView>
  );
}
