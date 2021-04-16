import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends, fetchFriendsWithDistance, backToIdle, doOnce } from "./redux/slices/userSlice";
import BackgroundTask from "./FetchFriendsBackground";

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;

  const webId = id.replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const closeFriendsStatus = useSelector(state => state.user.closeFriendsStatus);
  const doUna = useSelector(state => state.user.doOnce);
  const onlineCloseFriends = useSelector(state => state.user.onlineCloseFriends);
  const onlineFriends = useSelector(state => state.user.onlineFriends);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle" && profileStatus === "succeeded") {
      dispatch(fetchFriends(webId));
    } else if (closeFriendsStatus === "idle" && friendsStatus === "succeeded") {  
      dispatch(fetchFriendsWithDistance()); 
    } else if (closeFriendsStatus === "succeeded") {
      navigation.navigate("Radarin");
    } else if(friendsStatus === "failed"){
      dispatch(backToIdle());
      if(!doUna) {
        dispatch(doOnce());
        navigation.navigate("Login",  { qrUpdatedFlag: true });
      }
    }
  });

  return (
    <View style={styles.mainScreenContainer}>
    <ImageBackground source={require("./assets/background.jpg")} style={styles.background}>
    <View style={styles.loadingScreen}>
      <Image style={styles.loadingImage}
        source={require("./assets/icon.png")}
      />
      <Text style={styles.loadingText}>Loading...</Text>
      <BackgroundTask
              interval={600000}
              function={() => {
                dispatch(fetchFriends());
                console.log(onlineFriends);
              }}
            />
      <BackgroundTask
              interval={60000}
              function={() => {
                dispatch(fetchFriendsWithDistance());
                console.log(onlineCloseFriends);
              }}
            />
    </View>
    </ImageBackground>
    </View>
  );
}



