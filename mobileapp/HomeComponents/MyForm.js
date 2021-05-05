import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Button } from "react-native";
import { Card } from "react-native-elements";
import styles from "../MyStyles";
import { getLocation } from "../GetLocation";
import * as WebBrowser from "expo-web-browser";
import { useDispatch } from "react-redux";
import { changeOverlayVisible } from "../redux/slices/executingSlice";
import { showMessage } from "react-native-flash-message";

export default function MyForm() {
  
    const [result, setResult] = useState(null);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
  
    const _handlePressButtonAsync = async () => {
      let browserParams = {
        toolbarColor: '#094072'
      };
  
      const coords = await getLocation();

      if (coords == "No location"){
        showMessage({
          message: "You location is not been taken",
          description: "Sorry, you can't upload your location because it is not being taken, please enable it.",
          type: "info",
          duration: 20000,
        });
      } else {
        let uri = "uploadLocation?title=" + title + "&comment=" + comment + "&lat=" + coords.coords.latitude + "&long=" + coords.coords.longitude;
  
        let result = await WebBrowser.openBrowserAsync("https://radarinen3bwebapp.herokuapp.com/#/" + uri, browserParams);
        setResult(result);
    
        dispatch(changeOverlayVisible());
      }
      
    };
  
    return (
      <ScrollView>
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