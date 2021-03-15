import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-elements'
import styles from './MyStyles'
import MyMenu from './MyMenu'
import fetchFriends from './FetchFriends'


{/*Esto debería ir en el return delante de Navigation container pero.. cosas raras con comentarios
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{navigation.navigate('Post')}}
        style={styles.touchableOpacityStile}>
          <Image style={styles.icon} source={require("./assets/add-24px.png")}/>
    </TouchableOpacity>*/}

export default function HomeScreen({ navigation }) {

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
            source={require('./assets/icon.png')}
          />
        </View>
      )
      ),
    });
  }, [navigation]);

  var parsedNames = fetchFriends();

  return (
    <ScrollView>
      <View style={styles.mainScreenContainer}>
        <Text style={styles.normalText}>Friends close to your location:</Text>
        {
          parsedNames.map((u) => {
            return (
              <Card containerStyle={styles.card}>
                <Card.Title>{u}</Card.Title>
                <Card.Divider />
                <Text style={styles.name}>1 km</Text>
              </Card>
            );
          })
        }
      </View>
    </ScrollView>
  );
}


