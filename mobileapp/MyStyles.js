import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainScreenContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    padding: 0
  },
  header: {
    backgroundColor: '#3f51b5',
  },
  dotsbutton: {
    alignSelf:'flex-end',
    backgroundColor: '#3f51b5',
    borderRadius: 20,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconWrapper: {
    padding:12
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
  textInput: {
    height: 40,
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius:5,
    padding:10,
    margin:20
  },
  card: {
    width: 360,
    justifyContent: 'center',
    borderRadius:5,
    padding:10,
  },
  friends: {
    fontSize:16, 
    padding: 30
  },
  cardButton: {
    padding: 20,
  },
  signinCardTitle: {
    fontSize:25
  },
  cardTitle: {
    fontSize:18
  },
  normalText: {
    fontSize:16,
    padding: 10,
    paddingLeft: 20
  },
  smallText: {
    fontSize:12,
    alignSelf:'center'
  },
  username:{
    alignSelf: 'center',
    padding:10,
    paddingBottom:30,
  }
});