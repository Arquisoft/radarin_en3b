import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { Provider as ProviderRedux } from "react-redux";
import styles from "./MyStyles";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ProfileScreen from "./ProfileScreen";
import LoginScreen from "./LoginScreen";
import LoadingScreen from "./LoadingScreen";
import store from "./redux/store";
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProviderRedux store={store}>
      <Provider>
        <FlashMessage position="top"/>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Radarin" component={HomeScreen} options={{
              title: "Radarin",
              headerStyle: styles.header,
              headerTintColor: "#fff"
            }} />
            <Stack.Screen name="Login" component={LoginScreen} initialParams={{ qrUpdatedFlag: false }} options={{
              title: "Radarin",
              headerStyle: styles.header,
              headerTintColor: "#fff"
            }} />
            <Stack.Screen name="About" component={AboutScreen} options={{
              title: "About Radarin",
              headerStyle: styles.header,
              headerTintColor: "#fff"
            }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{
              title: "Profile",
              headerStyle: styles.header,
              headerTintColor: "#fff"
            }} />

            <Stack.Screen options={{ headerShown: false }} name="Loading" component={LoadingScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ProviderRedux>
  );
}