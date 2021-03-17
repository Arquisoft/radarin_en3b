import React, { useState } from 'react';
import { BackHandler, Image } from 'react-native';
import { View, Text, TextInput, Button, Linking, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import styles from './MyStyles';
import { BarCodeScanner } from "expo-barcode-scanner";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

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
    save("op234iyu5v6oy234iuv6", data);
    navigation.navigate('Radarin');
  };

  function changeShowScanner() {
    setShowScanner(true);
  }

  if (showScanner) {
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleQrScanned}
        style={StyleSheet.absoluteFillObject}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.signinCardTitle}>Sign in</Card.Title>
          <Card.Divider />
          <Text style={styles.normalText}>Click the button and scan the QR:</Text>
          <Text style={styles.smallText}>Don't have the QR? You can get it here: <Text style={{ color: '#3f51b5' }} onPress={() => { Linking.openURL('https://inrupt.com/') }}> Inrupt </Text> </Text>
          <View style={styles.cardButton}>
            <Button color="#3f51b5" title='Scan' onPress={changeShowScanner}>Scan</Button>
          </View>
        </Card>

      </View>
    );
  }
}