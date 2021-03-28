import { createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import styles from './MyStyles'
import HomeScreen from './HomeScreen'
import AboutScreen from './AboutScreen'
import ProfileScreen from './ProfileScreen'
import PostScreen from './PostScreen'
import LoginScreen from './LoginScreen'
import LoadingScreen from './LoadingScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Radarin" component={HomeScreen} options={{
          title: 'Radarin',
          headerStyle: styles.header,
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="Post" component={PostScreen} options={{
          title: 'Write a post',
          headerStyle: styles.header,
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{
          title: 'Radarin',
          headerStyle: styles.header,
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="About" component={AboutScreen} options={{
          title: 'About Radarin',
          headerStyle: styles.header,
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
          title: 'Profile',
          headerStyle: styles.header,
          headerTintColor: '#fff'
        }}/>
    
        <Stack.Screen options={{headerShown: false}} name="Loading" component={LoadingScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}