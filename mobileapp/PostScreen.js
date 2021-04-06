import React from "react";
import { View, Text, TextInput} from "react-native";
import styles from "./MyStyles";

export default function PostScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Post something: </Text>
      <TextInput style={styles.textInput} placeholder="Write here..."></TextInput>
    </View>
  );
}