import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Menu, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./MyStyles";
import * as Updates from 'expo-updates';

export default function MyMenu ({navigation}){

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
      <View style={styles.menu}>
      <TouchableOpacity style={styles.dotsbutton} onPress={openMenu}>
          <Image source={require("./assets/dots.png")} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.menuwrapper}>
        <Menu style={styles.menuitem}
          visible={visible}
          onDismiss={closeMenu}
          anchor={{ x: 180, y: 80 }}>
          <Menu.Item icon={require("./assets/profile.png")} 
          onPress={()=>{navigation.navigate("Profile"); closeMenu();}} title="Profile"/>
          <Divider />
          <Menu.Item icon={require("./assets/about.png")}
          onPress={() => {navigation.navigate("About"); closeMenu();}} title="About Radarin" />
          <Divider />
          <Menu.Item icon={require("./assets/door.png")}
          onPress={() => {AsyncStorage.setItem("userId",""); Updates.reloadAsync();}} title="Logout" />
        </Menu>
        </View>
      </View>
  );
}