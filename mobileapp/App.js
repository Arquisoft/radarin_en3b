import { createStackNavigator} from '@react-navigation/stack';

import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button} from 'react-native';
import { Card} from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import {TextInput} from 'react-native';

const Stack = createStackNavigator();

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

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Radarin" component={HomeScreen} options={{
          title: 'Radarin',
          headerStyle: {
            backgroundColor: '#0074A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
              <Image style={styles.icon} source={require("./assets/dots.png")}/>
            </TouchableOpacity>
          ),
        }}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Post something: </Text>
      <TextInput style={{ height: 40, borderColor: '#ffff', borderWidth: 1 }} defaultValue="Write here..."></TextInput>
    </View>
  );
}


function HomeScreen({navigation}) {
  return (
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{navigation.navigate('Details')}}
        style={styles.touchableOpacityStile}>
          <Image style={styles.icon} source={require("./assets/add-24px.png")}/>
      </TouchableOpacity>

      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'flex-start', padding: 0,}}>
          <Text style={{ fontSize:16,  padding: 30,}}>Friends close to your location:</Text>
          {
          friends.map((u,i) => {
            return (
              <Card>
                <Card.Title>{u.name}</Card.Title>
                <Card.Divider/>
                <Text style={styles.name}>{u.distance}</Text>
              </Card>
              );
            })
          }
        </View>
    </ScrollView>
    
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsbutton: {
    backgroundColor: '#0074A4',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  touchableOpacityStile: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 30,
    backgroundColor:'#0074A4',
    borderRadius: 30,
    zIndex: 1
  },
});
