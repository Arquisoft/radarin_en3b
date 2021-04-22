import { StyleSheet } from "react-native";

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
  homeScreenContainer: {
    flex: 1
  },
  overlayContainer: {
    flex: 0.4,
    borderRadius:15,
  }
  ,modalFormContainer: {
    flex: 0.4,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 40,
    margin: 20,
    borderRadius: 10
  },
  titleForm: {
    height: 40,
    margin: 12,
    color: '#032C45',
  }, 
  commentForm: {
    padding: 0,
    flex: 1,
    width: 275,
    color: '#032C45',
    flexWrap: "wrap",
    overflow: "scroll",
  },
  commentView: {
    padding: 50,
    flex: 1,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    marginTop: -40,
    flexWrap: "wrap",
    
  },
  formCard: {
    width: 300,
    justifyContent: 'center',
    borderRadius:5,
    padding:10,
    borderColor: '#0A4A84',
  },
  header: {
    backgroundColor: '#094072',
  },
  dotsbutton: {
    alignSelf:'flex-end',
    backgroundColor: '#094072',
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
  pressable: {
    resizeMode: 'contain',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'baseline',
    bottom: 20,
    borderRadius: 30,
    marginLeft: 300,
    zIndex: 1
  },
  menu: {
    flex: 1,
    width: 220,
  },
  menuitem: {
    flex: 1,
    width: 200
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
    borderColor: '#0A4A84',
  },
  nofriendscard: {
    width: 360,
    justifyContent: 'center',
    borderRadius:5,
    padding:10,
    backgroundColor:'#D5E7F2',
  },
  friends: {
    fontSize:16,
    color:'#0A4A84', 
    padding: 30
  },
  cardButton: {
    padding: 20,
  },
  signinCardTitle: {
    fontSize:25,
    color:'#094072',
  },
  cardTitle: {
    fontSize:18,
    color:'#094072', 
  },
  normalText: {
    fontSize: 16,
    margin: 10,
    marginLeft: 20,
    padding: 2,
    color: '#032C45',
  },
  smallText: {
    fontSize:12,
    alignSelf:'center',
    color: '#032C45',
  },
  username:{
    alignSelf: 'center',
    padding:10,
    paddingBottom:30,
    color: '#032C45',
  },
  name: {
    color: '#032C45',
  },
  loadingScreen:{
    flex: 1,
    alignItems: 'center',
    paddingTop:180
  },
  loadingImage:{
    width: 120,
    height: 120,
    
  },
  loadingText:{
    paddingTop:180,
    fontSize:20,
    fontWeight:'bold',
    color: '#fff'
  },
  background:{
    flex: 1,
    resizeMode: "cover",
  },
  disconnectedcard:{
    width: 360,
    justifyContent: 'center',
    borderRadius:5,
    padding:10,
    marginRight:50,
    backgroundColor:'#EAEAEA',
  },
  disconnectedtext:{
    color:'#818181'
  },
  divider:{
    backgroundColor:'#126BBD'
  },
});