import React from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
import { Card} from 'react-native-elements'
import styles from './MyStyles'
import MyMenu from './MyMenu'

const friends = [
  {
    name: 'Pablo',
    distance: '500 m'
  },
  {
    name: 'Irene',
    distance: '1 km'
  },
  {
    name: 'Lucas',
    distance: '2 km'
  },

  {
    name: 'Ines',
    distance: '2 km'
  },

  {
    name: 'Laura',
    distance: '2 km'
  },
  {
    name: 'Marcos',
    distance: '2 km'
  },
  {
    name: 'Lucía',
    distance: '2 km'
  },
];

{/*Esto debería ir en el return delante de Navigation container pero.. cosas raras con comentarios
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{navigation.navigate('Post')}}
        style={styles.touchableOpacityStile}>
          <Image style={styles.icon} source={require("./assets/add-24px.png")}/>
    </TouchableOpacity>*/}
    
export default function HomeScreen({navigation}) {

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

  return (
    <ScrollView>
    <View style={styles.mainScreenContainer}>
      <Text style={styles.normalText}>Friends close to your location:</Text>
      {
      friends.map((u) => {
        return (
          <Card containerStyle={styles.card}>
            <Card.Title>{u.name}</Card.Title>
            <Card.Divider/>
            <Text style={styles.name}>{u.distance}</Text>
          </Card>
          );
        })
      }
    </View>
    </ScrollView>
  );
}