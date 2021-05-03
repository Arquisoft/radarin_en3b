import React, { useState } from "react";
import { View, Text, ScrollView, Image, Button} from "react-native";
import styles from "./MyStyles";
import { Overlay } from "react-native-elements/dist/overlay/Overlay";

export default function MyOverlayLocationSupport(){
  const [visible, setVisible] = useState(true);
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  
  return(
    <View >
    <Overlay  isVisible={visible} onBackdropPress={toggleOverlay}>
      <MyLocationTour closing={toggleOverlay}></MyLocationTour>
    </Overlay> 
    </View>)
}

const MyLocationTour = ({closing}) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [visibleFirst, setVisibleFirst] = useState(true);
  const [visibleSecond, setVisibleSecond] = useState(false);
  const [visibleThird, setVisibleThird] = useState(false);
  const [visibleFourth, setVisibleFourth] = useState(false);
  const [visibleFifth, setVisibleFifth] = useState(false);

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
        setNextName('Finish');
        break;
      case 4:
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
      <Text style={styles.titleText}>Sending your own locations</Text>
      <Text style={styles.normalText}>You have just entered the place where you can upload your location.</Text>
      <Text style={styles.normalText}>We will guide you on the way you can upload and safe your personalized location. If you already know it you can skip this tutorial by pressing "Exit" below.</Text>
      <Button color="#094072" title="Exit" onPress={exit}></Button>
    </View>
  
  )
}

const MySecondPage = () => {
  return(
      <View >
        <Text style={styles.titleText}>Commenting your location</Text>
        <Text style={styles.normalText}>The first you will see is two fields: the title and a comment multiline you can fill. Both of them are optional, but to find them later in the web app you should fill at least the title.</Text>
        <Image source={require("./assets/tour_location_title_comment.jpeg")} style={{
          width: 300,
          height:246,
          alignSelf:'center'
        }}></Image>
        <Text style={styles.normalText}>Then, press the button send.</Text>
      </View>)
}

const MyThirdPage = () => {
  return(
    <ScrollView>
      <View>
        <Text style={styles.titleText}>Logging in</Text>
        <Text style={styles.normalText}>The button is redirecting you to our webpage, where you will finally send the location. However, we have to register first with our user and password.</Text>
        <Text style={styles.normalText}>First of all we will press the sign in button: </Text>
        <Image source={require("./assets/tour_location_before_uploading.jpeg")} style={{
                width: 233,
                height: 300,
                alignSelf:'center'
              }}></Image>
        <Text style={styles.normalText}>Then, we select our provider and log in as we would do in the web page:</Text>
        <Image source={require("./assets/tour_location_select_provider.jpeg")} style={{
                width: 205,
                height: 300,
                alignSelf:'center'
              }}></Image>
        <Text style={styles.normalText}>After this login process each time you send a new location you won't need to repeated so it is easier for you :)</Text>
      </View>
    </ScrollView>)
}

const MyFourthPage = () => {
  return(
    <ScrollView>
      <View>
        <Text style={styles.titleText}>Selecting photo</Text>
        <Text style={styles.normalText}>Now, if you followed all the steps, you should be in this window where you can see the title and the comment you made on your location. 
        The button of the picture below allows you to take a photo or select one from your gallery to be sent.</Text>
        <Image source={require("./assets/tour_location_select_photo.jpeg")} style={{
          width: 300,
          height: 511,
          marginBottom: 20,
          alignSelf: 'center'
        }}></Image>
        <Text style={styles.normalText}>After you are done you just have to press the arrow button and it will be sent!</Text>
      </View> 
    </ScrollView>)
}

const MyFifthPage = () => {
  return(
    <ScrollView>
      <View>
        <Text style={styles.titleText}>Back home</Text>
        <Text style={styles.normalText}>Congratulations! Now you have sent a personalized location you can check anytime in the web!</Text>
        <Text style={styles.normalText}>After that a window like this will be displayed. You only have to press the "X" button to go back to the Radarin application: </Text>
        <Image source={require("./assets/tour_location_sent.jpeg")} style={{
          width: 243,
          height: 300,
          alignSelf: 'center'
        }}></Image>
      </View>
    </ScrollView>)
}
