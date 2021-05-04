import React, {useCallback, useState }  from "react";
import { View, Text, ScrollView, Linking, Button, Pressable, Image } from "react-native";
import { Card} from "react-native-elements";
import {DataTable, Avatar } from "react-native-paper";
import {HeaderBackButton} from "@react-navigation/stack";
import styles from "./MyStyles";
import MyMenu from "./MyMenu";
import MyOverlaySupport from "./MyFirstTour";
import MyOverlayLocationSupport from "./MyLocationTour";

const supportedURL = "https://solidproject.org/";

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button color="#094072" title={children} onPress={handlePress} />;
};

export default function AboutScreen({navigation}) {
  const [firstTutorial, setFirstTutorial] = useState(false);
  const [locationTutorial, setLocationTutorial] = useState(false);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
            <MyMenu navigation={navigation}></MyMenu>
          )
      ),
      headerLeft: (() => (
        <HeaderBackButton tintColor={"#FFF"} onPress={()=>{navigation.navigate("Radarin"); }}></HeaderBackButton>
      )
  )
    });
  }, [navigation]);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>How to use Radarin</Card.Title>
            <Card.Divider style={styles.divider}/>
            <Text style={styles.normalText}>How to start sending your locations</Text> 
            <Pressable onPress={() =>{setFirstTutorial(!firstTutorial)}} style={styles.preassableHelp}>
              <Image source={require("./assets/about.png")} style={styles.helpButton}></Image>
            </Pressable>
            {firstTutorial ? (<MyOverlaySupport></MyOverlaySupport>):null}
            <Card.Divider style={styles.divider}/>
            <Text style={styles.normalText}>How to send a location</Text>
            <Pressable onPress={() =>{setLocationTutorial(!locationTutorial)}} style={styles.preassableHelp}>
              <Image source={require("./assets/about.png")} style={styles.helpButton}></Image>
            </Pressable>
            {locationTutorial ? (<MyOverlayLocationSupport></MyOverlayLocationSupport>):null}
      </Card>
      <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>About Radarin</Card.Title>
            <Card.Divider style={styles.divider}/>
            <Text style={styles.name}>Radarin will be a system to facilitate meetings between friends using new technologies. The application can get access to the mobile phone localization of the users who voluntarily activate it and will allow other users who are their friends to know when they are near them. Everything will be build with Solid so you can be the owner of your own data!.
            </Text>
            <View style={styles.cardButton}>
            <OpenURLButton url={supportedURL}>Learn more about Solid</OpenURLButton>
            </View>
      </Card>
      <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>Meet the devs!</Card.Title>
            <Card.Divider style={styles.divider}/>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require("./assets/alvaro.jpg")} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Álvaro Requejo</Text></DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require("./assets/marcos.jpg")} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Marcos Tobías</Text></DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require("./assets/carmen.jpg")} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Carmen Rendueles</Text></DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require("./assets/miguel.jpg")} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Miguel Ligero</Text></DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require("./assets/juanr.jpg")} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Juan Rodriguez</Text></DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require("./assets/labra.jpg")} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Jose Emilio Labra</Text></DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require("./assets/pablo.jpg")} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Text style={styles.name}>Pablo González</Text></DataTable.Cell>
              </DataTable.Row>
            </DataTable>
      </Card>
    </View>
    </ScrollView>
  );
}