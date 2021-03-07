import { createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, TextInput, Button} from 'react-native';
import { Card} from 'react-native-elements'
import { NavigationContainer, SafeAreaView } from '@react-navigation/native';
import { Menu, Divider, Provider, Switch, DataTable, Avatar } from 'react-native-paper';


const Stack = createStackNavigator();

const friends = [
  {
    name: 'Pablo',
    distance: '500 m'
  },
  {
    name: 'Irene',
    distance: '1 km'
  },
  {
    name: 'Lucas',
    distance: '2 km'
  },

  {
    name: 'Ines',
    distance: '2 km'
  },

  {
    name: 'Laura',
    distance: '2 km'
  },
  {
    name: 'Marcos',
    distance: '2 km'
  },
  {
    name: 'Lucía',
    distance: '2 km'
  },
];

  {/*Esto debería ir en el return delante de Navigation container pero.. cosas raras con comentarios
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{navigation.navigate('Post')}}
        style={styles.touchableOpacityStile}>
          <Image style={styles.icon} source={require("./assets/add-24px.png")}/>
    </TouchableOpacity>*/}

export default function App() {
  return (
    <Provider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Radarin" component={HomeScreen} options={{
          title: 'Radarin',
          headerStyle: {
            backgroundColor: '#0074A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
        <Stack.Screen name="Post" component={PostScreen} options={{
          title: 'Write a post',
          headerStyle: {
            backgroundColor: '#0074A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{
          title: 'Radarin',
          headerStyle: {
            backgroundColor: '#0074A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
        <Stack.Screen name="About" component={AboutScreen} options={{
          title: 'About Radarin',
          headerStyle: {
            backgroundColor: '#0074A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#0074A4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

function PostScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Post something: </Text>
      <TextInput style={{ height: 40, borderColor: '#ffff', borderWidth: 1 }} defaultValue="Write here..."></TextInput>
    </View>
  );
}

function LoginScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Card containerStyle={{width: 360}}>
            <Card.Title>Log in</Card.Title>
            <Card.Divider/>
            <Text>Write your provider:</Text>
            <TextInput placeholder='https://inrupt.net' style={{ height: 40, backgroundColor: '#EBEBEB', borderColor: '#EBEBEB', borderWidth: 1, margin:20}}></TextInput>
            <Button title='Log in'onPress={() => {navigation.navigate('Radarin')}}>Login</Button>
      </Card>
      
    </View>
  );
}

function AboutScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
            <MyMenu navigation={navigation}></MyMenu>
          )
      )
    });
  }, [navigation]);

  return (
    <ScrollView>
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      <Card>
            <Card.Title>About Radarin</Card.Title>
            <Card.Divider/>
            <Text>Radarin will be a system to facilitate meetings between friends using new technologies. The application can get access to the mobile phone localization of the users who voluntarily activate it and will allow other users who are their friends to know when they are near them. Everything will be build with Solid so you can be the owner of your own data!.
            </Text>
            <Button title='Learn more about Solid'></Button>
      </Card>
      <Card containerStyle={{width: 360}}>
            <Card.Title>Meet the devs!</Card.Title>
            <Card.Divider/>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require('./assets/labra.jpg')} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>Jose Emilio Labra</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require('./assets/miguel.jpg')} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>Álvaro Requejo</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require('./assets/miguel.jpg')} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>Marcos Tobías</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require('./assets/miguel.jpg')} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>Juan Buenaga</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require('./assets/carmen.jpg')} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>Carmen Rendueles</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require('./assets/miguel.jpg')} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>Miguel Ligero</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell><Avatar.Image size={40} source={require('./assets/miguel.jpg')} /></DataTable.Cell>
                <DataTable.Cell style={{flex: 3}}>Juan Rodriguez</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
      </Card>
    </View>
    </ScrollView>
  );
}

function ProfileScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
            <MyMenu navigation={navigation}></MyMenu>
          )
      )
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Get location:</Text>
      <MySwitch></MySwitch>
    </View>
  );
}

function HomeScreen({navigation}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (() => (
            <MyMenu navigation={navigation}></MyMenu>
          )
      )
    });
  }, [navigation]);

  return (
    <ScrollView>
    <View style={{ flex: 1, justifyContent: 'flex-start', padding: 0,}}>
      <Text style={{ fontSize:16,  padding: 30,}}>Friends close to your location:</Text>
      {
      friends.map((u) => {
        return (
          <Card>
            <Card.Title>{u.name}</Card.Title>
            <Card.Divider/>
            <Text style={styles.name}>{u.distance}</Text>
          </Card>
          );
        })
      }
    </View>
    </ScrollView>
  );
}

const MySwitch = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

function MyMenu ({navigation}){

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
      <View style={styles.menu}>
      <TouchableOpacity style={styles.dotsbutton} onPress={openMenu}>
          <Image source={require('./assets/dots.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.menuwrapper}>
        <Menu style={styles.menuitem}
          visible={visible}
          onDismiss={closeMenu}
          anchor={{ x: 180, y: 80 }}>
          <Menu.Item icon={require('./assets/profile.png')} 
          onPress={()=>{navigation.navigate('Profile');}} title="Profile"/>
          <Divider />
          <Menu.Item icon={require('./assets/about.png')}
          onPress={() => {navigation.navigate('About')}} title="About Radarin" />
          <Divider />
          <Menu.Item icon={require('./assets/door.png')}
          onPress={() => {navigation.navigate('Login')}} title="Logout" />
        </Menu>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsbutton: {
    alignSelf:'flex-end',
    backgroundColor: '#0074A4',
    borderRadius: 20,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  mainMenuAnchor: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  touchableOpacityStile: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 30,
    backgroundColor:'#0074A4',
    borderRadius: 30,
    zIndex: 1
  },
  menu: {
    flex: 1,
    width: 220,
  },
  menuitem: {
    flex: 1,
    width: 200,
  },
  menuwrapper: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
});