import React from 'react';
import { View, Image, Text} from 'react-native';
import styles from './MyStyles';
import {setWebId} from './FetchFriends';

export default function LoadingScreen({route, navigation}) {
  const { id } = route.params;
  const webId = JSON.stringify(id);
 setWebId(navigation,webId).then(() => {navigation.navigate('Radarin');});

  return (
      <View style={styles.loadingScreen}>
        <Image style={styles.loadingImage}
        source={require('./assets/icon.png')}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
  );
}



