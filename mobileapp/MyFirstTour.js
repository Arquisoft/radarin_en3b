import React, { useState } from "react";
import { View, Text, ScrollView, Image, Button, Dimensions} from "react-native";
import styles from "./MyStyles";
import { Overlay } from "react-native-elements/dist/overlay/Overlay";

export default function MyOverlaySupport(){
    const [visible, setVisible] = useState(true);
  
    const toggleOverlay = () => {
      setVisible(!visible);
    };
    
    return(
      <View >
      <Overlay  isVisible={visible} onBackdropPress={toggleOverlay}>
        <MyTour closing={toggleOverlay}></MyTour>
      </Overlay> 
      </View>)
  }
  
  const MyTour = ({closing}) => {
  
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleFirst, setVisibleFirst] = useState(true);
    const [visibleSecond, setVisibleSecond] = useState(false);
    const [visibleThird, setVisibleThird] = useState(false);
    const [visibleFourth, setVisibleFourth] = useState(false);
    const [visibleFifth, setVisibleFifth] = useState(false);
    const [visibleSixth, setVisibleSixth] = useState(false);
  
    const [disabledNext, setDisabledNext] = useState(false);
    const [nextName, setNextName] = useState('Next');
    const [disabledBack, setDisabledBack] = useState(true);
  
    const onNextClick = () => {
      setCurrentPage( currentPage + 1);
      switch(currentPage) {
        case 0:
          setDisabledBack(false);
          setVisibleFirst(false);
          setVisibleSecond(true);
          break;
        case 1: 
          setVisibleSecond(false);
          setVisibleThird(true);
          break;
        case 2: 
          setVisibleThird(false);
          setVisibleFourth(true);
          break;
        case 3:
          setVisibleFourth(false);
          setVisibleFifth(true);
          break;
        case 4:
          setVisibleFifth(false);
          setVisibleSixth(true);
          setNextName('Finish');
          break;
        case 5:
          closing();
          break;
      }
      
    }
  
    const onPreviousClick = () => {
      setCurrentPage( currentPage - 1);
      switch(currentPage) {
        case 1: 
          setDisabledBack(true);
          setVisibleFirst(true);
          setVisibleSecond(false);
          break;
        case 2: 
          setVisibleSecond(true);
          setVisibleThird(false);
          break;
        case 3:
          setVisibleThird(true);
          setVisibleFourth(false);
          break;
        case 4:
          setVisibleFourth(true);
          setVisibleFifth(false);
          break;
        case 5:
          setVisibleFifth(true);
          setVisibleSixth(false);
          setNextName('Next');
          break;
      }
    }
  
    return(
      <View style={styles.helpGuideView}>
      <ScrollView>
        <View >
          {visibleFirst ? (<MyFirstPage exit={closing}></MyFirstPage>) : null}
          {visibleSecond ? (<MySecondPage></MySecondPage>) : null}
          {visibleThird ? (<MyThirdPage></MyThirdPage>) : null}
          {visibleFourth ? (<MyFourthPage></MyFourthPage>) : null}
          {visibleFifth ? (<MyFifthPage></MyFifthPage>) : null}
          {visibleSixth ? (<MySixthPage></MySixthPage>) : null}
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row',
          justifyContent: 'space-around', 
          marginTop: 20, }}>
            <Button color="#094072" title="Previous" disabled={disabledBack} onPress={onPreviousClick} sytle={styles.buttonPrevious}></Button>
            <Button color="#094072" title={nextName} disabled={disabledNext} onPress={onNextClick} sytle={styles.buttonNext}></Button>
          </View>
      </View>
    )  
  }
  
  const MyFirstPage = ({exit}) => {
    return(
    
      <View> 
        <Text style={styles.titleText}>Welcome to Radarin!</Text>
        <Text style={styles.normalText}>In this tour we will guide you through the posibilities of this application, so let's start!</Text>
        <Text style={styles.normalText}>If you want to skip this introduction, just press the button exit</Text>
        <Button color="#094072" title="Exit" onPress={exit}></Button>
      </View>
    
    )
  }
  
  const MySecondPage = () => {
    return(
        <View >
          <Text style={styles.titleText}>First steps</Text>
          <Text style={styles.normalText}>If it's the first time you are using us, this will appear as you don't have any location yet: </Text>
          <Image source={require("./assets/tour_never_sent_location.jpeg")} style={{
          width: 240,
          height:300,
          alignSelf:'center'
        }}></Image>
      <Text style={styles.normalText}>To change this and start using the application, first press the "Go to Profile"</Text>
    </View>)
  }
  
  const MyThirdPage = () => {
    return(
      <ScrollView>
        <View>
          <Text style={styles.titleText}>Profile</Text>
          <Text style={styles.normalText}>Now, you will be in your profile. This is what you can see: </Text>
          <Image source={require("./assets/tour_profile.jpeg")} style={{
                  width: 300,
                  height: 300,
                  alignSelf:'center'
                }}></Image>
        </View>
      </ScrollView>)
  }
  
  const MyFourthPage = () => {
    return(
      <ScrollView>
        <View>
          <Text style={styles.titleText}>Enabling location</Text>
          <Text style={styles.normalText}>In order to allow us to take your location, press this slide button: </Text>
          <Image source={require("./assets/tour_slide_button_of.jpeg")} style={{
            width: 300,
            height: 100,
            marginBottom: 20,
            alignSelf: 'center'
          }}></Image>
          <Image source={require("./assets/tour_slide_button_on.jpeg")} style={{
            width: 300,
            height: 100,
            alignSelf: 'center'
          }}></Image>
        </View> 
      </ScrollView>)
  }
  
  const MyFifthPage = () => {
    return(
      <ScrollView>
        <View>
          <Text style={styles.titleText}>Back home</Text>
          <Text style={styles.normalText}>Congratulations! Now you are connected and you can see your close friends!</Text>
          <Text style={styles.normalText}>However, in case you don't have any friends yet, you can send them the link to use our application and join you</Text>
          <Image source={require("./assets/tour_sent_location_no_friends.jpeg")} style={{
            width: 282,
            height: 300,
            alignSelf: 'center'
          }}></Image>
        </View>
      </ScrollView>)
  }
  
  const MySixthPage = () => {
    return(
      <ScrollView>
        <View>
          <Text style={styles.titleText}>Showing friends</Text>
          <Text style={styles.normalText}>Now, if you have added your friends, you should be seeing them and the distance between you.</Text>
          <Text style={styles.normalText}>A notification should warn you when they are close. If you want to know where they are, just press their name and you will see their position in Google Maps!</Text>
          <Image source={require("./assets/tour_showing_friends.jpeg")} style={{
            width: 300,
            height: 300,
            alignSelf: 'center'
          }}></Image>
          <Text style={styles.normalText}>Now you can start using the app. Enjoy it! :)</Text>
        </View>
      </ScrollView>)
  }
