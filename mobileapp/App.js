import { createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Card} from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';

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

export default function App() {
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
            <TouchableOpacity onPress={() => alert("Button pressed")}>
              <Image style={styles.icon} source={require("./assets/dots.png")}/>
            </TouchableOpacity>
          ),
        }}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}


function HomeScreen() {
  return (
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
});

