import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, Button, Linking} from 'react-native';
import { Card} from 'react-native-elements';
import styles from './MyStyles';
import { BarCodeScanner } from "expo-barcode-scanner";

export default function LoginScreen({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (() => (
        <View style={styles.iconWrapper}>
        <Image
        style={styles.icon}
        source={require('./assets/icon.png')}
      />
      </View>
      )),
    }),
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status == 'granted');
    })();
  }, [navigation]);

  const handleQrScanned = ({ type, data }) => {
    setScanned(true);
    alert(data);
  };

  if(hasPermission === null)
    return <Text>Requesting for camera permission</Text>

  if(hasPermission === false)
    return <Text>No access to camera</Text>
  
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
            <Card.Title style={styles.signinCardTitle}>Sign in</Card.Title>
            <Card.Divider/>
            <Text style={styles.normalText}>Introduce your provider URL:</Text>
            
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleQrScanned}
            />

            <Text style={styles.smallText}>Don't have one? You can get it here: <Text style={{color: '#3f51b5'}} onPress={() => {Linking.openURL('https://inrupt.com/')}}> Inrupt </Text> </Text>
            <View style={styles.cardButton}>
            <Button color="#3f51b5" title='Log in'onPress={() => {navigation.navigate('Radarin')}}>Login</Button>
            </View>
      </Card>
      
    </View>
  );
}