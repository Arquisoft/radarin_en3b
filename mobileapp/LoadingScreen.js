import React, { useEffect } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends, fetchFriendsWithDistance } from "./redux/slices/userSlice";

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;
  const webId = JSON.stringify(id).replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);
  const closeFriendsStatus = useSelector(state => state.user.closeFriendsStatus);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle") {
      dispatch(fetchFriends(webId));
    } else if (closeFriendsStatus === "idle" && friendsStatus === "succeeded") {
      dispatch(fetchFriendsWithDistance());
    } else if (closeFriendsStatus === "succeeded") {
      navigation.navigate("Radarin");
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
    </View>
    </ImageBackground>
    </View>
  );
}



