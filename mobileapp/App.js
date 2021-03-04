import { createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Icon, ImageBackground} from 'react-native';
import { Card} from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';


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
      <Stack.Navigator initialRouteName="Radarin">
        <Stack.Screen name="Radarin" component={HomeScreen} options={{
          title: 'Radarin',
          headerStyle: {
            backgroundColor: '#0074A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <MyMenu></MyMenu>
          ),

        }}/>
      </Stack.Navigator>
    </NavigationContainer>
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

const MyMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<TouchableOpacity style={styles.dotsbutton} onPress={openMenu}>
          <Image source={require('./assets/dots.png')} style={styles.icon} />
        </TouchableOpacity>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
  );
};


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
  },
  icon: {
    width: 30,
    height: 30,
  },
  mainMenuAnchor: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
});

