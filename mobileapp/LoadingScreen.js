import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import styles from "./MyStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchFriends } from "./redux/slices/userSlice";

export default function LoadingScreen({ route, navigation }) {
  const { id } = route.params;
  const webId = JSON.stringify(id).replace(/['"]+/g, '');
  const dispatch = useDispatch();
  const profileStatus = useSelector(state => state.user.profileStatus);
  const friendsStatus = useSelector(state => state.user.friendsStatus);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(webId));

    } else if (friendsStatus === "idle") {
      dispatch(fetchFriends(webId));
      
    } else if (friendsStatus === "succeeded") {
      navigation.navigate("Radarin");
    }
  });

  return (
    <View style={styles.loadingScreen}>
      <Image style={styles.loadingImage}
        source={require("./assets/icon.png")}
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}



