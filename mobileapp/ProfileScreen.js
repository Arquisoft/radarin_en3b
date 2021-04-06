import React, {useState, useEffect} from 'react';
import { View, Text, Button} from 'react-native';
import { Card} from 'react-native-elements'
import {Switch, RadioButton} from 'react-native-paper';
import { DataTable, Avatar } from 'react-native-paper';
import {HeaderBackButton} from '@react-navigation/stack';
import styles from './MyStyles';
import MyMenu from './MyMenu';
import { getAsyncLocation } from './getAsyncLocations';
import { sendLocation } from './sendLocation';

export default function ProfileScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
            <MyMenu navigation={navigation}></MyMenu>
          )
      ),
      headerLeft: (() => (
        <HeaderBackButton tintColor={'#FFF'} onPress={()=>{navigation.navigate('Radarin');}}></HeaderBackButton>
      )
      )
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Text size={45} label="U" /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}><Card.Title style={styles.cardTitle}>Full name of the user</Card.Title></DataTable.Cell>
              </DataTable.Row>
            </DataTable>

            <Text style={styles.username}>username</Text>
            
            <Card.Divider/>

            <Card.Title>Settings</Card.Title>

            <DataTable>
            <DataTable.Row>
                <DataTable.Cell style={{flex: 3}}>Get location automatically:</DataTable.Cell>
                <DataTable.Cell><MySwitch ></MySwitch></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
                <DataTable.Cell>
                <Button title='Get my position'onPress={() => getAsyncLocation.getLocation()}>Get My Position
                </Button>
                </DataTable.Cell>
            </DataTable.Row>
            </DataTable>
            
      </Card>
    </View>
  );
}


const MySwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn) {
      sendLocation.getCurrentPositionAsync(isSwitchOn);
    } else {
      
    }
  }

  return <Switch color="#3f51b5" value={isSwitchOn} onValueChange={onToggleSwitch} />;
};