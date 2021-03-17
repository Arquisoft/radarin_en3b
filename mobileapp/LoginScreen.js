import React from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, Button, Linking} from 'react-native';
import { Card} from 'react-native-elements';
import styles from './MyStyles';

export default function LoginScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (() => (
        <View style={styles.iconWrapper}>
        <Image
        style={styles.icon}
        source={require('./assets/icon.png')}
      />
      </View>
      )
  ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
            <Card.Title style={styles.signinCardTitle}>Sign in</Card.Title>
            <Card.Divider/>
            <Text style={styles.normalText}>Introduce your provider URL:</Text>
            <TextInput placeholder="https://inrupt.net" style={styles.textInput}></TextInput>
            <Text style={styles.smallText}>Don't have one? You can get it here: <Text style={{color: '#3f51b5'}} onPress={() => {Linking.openURL("https://inrupt.com/");}}> Inrupt </Text> </Text>
            <View style={styles.cardButton}>
            <Button color="#3f51b5" title="Log in" onPress={() => {navigation.navigate("Radarin");}}>Login</Button>
            </View>
      </Card>
      
    </View>
  );
}