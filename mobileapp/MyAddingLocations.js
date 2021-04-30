import React, { useState } from "react";
import { View, Image, TextInput, Text, Button, ScrollView, Pressable } from "react-native";
import { Card, Overlay } from "react-native-elements";
import styles from "./MyStyles";
import * as WebBrowser from "expo-web-browser";
import { getLocation } from "./GetAsyncLocation";

export default function MyOverlay() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.homeScreenContainer}>
      <MyPressable onPressing={toggleOverlay}></MyPressable>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <MyForm></MyForm>
      </Overlay>
    </View>)
}


const MyForm = () => {

  const [result, setResult] = useState(null);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const _handlePressButtonAsync = async () => {
    let browserParams = {
      toolbarColor: '#094072'
    };

    const coords = await getLocation();
    let uri = "uploadLocation?title=" + title + "&comment=" + comment + "&lat=" + coords.coords.latitude + "&long=" + coords.coords.longitude;

    let result = await WebBrowser.openBrowserAsync("https://radarinen3bwebapp.herokuapp.com/#/" + uri, browserParams);
    setResult(result);
  };

  return (
    <ScrollView >
      <Card containerStyle={styles.formCard}>
        <Text style={styles.cardTitle}>Title</Text>
        <TextInput placeholder="Title of the ubication" label="Title" style={styles.titleForm} onChangeText={(title) => setTitle(title)}></TextInput>
        <Card.Divider style={styles.divider} />
        <Text style={styles.cardTitle}>Comment</Text>
        <View style={styles.commentView}>
          <TextInput placeholder="Comment here..." label="Comment" style={styles.commentForm} multiline={true} onChangeText={(comment) => setComment(comment)}></TextInput>
        </View>
        <Card.Divider style={styles.divider} />
        <Button color='#094072' title="Send location" onPress={_handlePressButtonAsync}></Button>
      </Card>

    </ScrollView>
  )
}

/*
<TextInput placeholder="Title of the ubication" label="Title" style = {styles.titleForm}></TextInput>
        <TextInput placeholder="Comment here..." label = "Comment" style = {styles.commentForm}></TextInput>
*/

const MyPressable = ({ onPressing }) => {

  const myStyle = ({ pressed }) => [
    {
      backgroundColor: pressed
        ? 'rgb(210, 230, 255)'
        : '#094072'
    },
    styles.pressable
  ];


  return <Pressable activeOpacity={0.7} style={myStyle} onPress={() => onPressing()}>
    <Image style={styles.icon} source={require("./assets/add-24px.png")} />
  </Pressable >
};