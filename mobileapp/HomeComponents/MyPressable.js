import React from 'react';
import { Image, Pressable } from "react-native";
import styles from "../MyStyles";

export default function MyPressable({ onPressing }) {
  
    const myStyle = ({ pressed }) => [
      {
        backgroundColor: pressed
          ? 'rgb(210, 230, 255)'
          : '#094072'
      },
      styles.pressable
    ];
  
  
    return <Pressable activeOpacity={0.7} style={myStyle} onPress={() => onPressing()}>
      <Image style={styles.icon} source={require("../assets/add-24px.png")} />
    </Pressable >
  }