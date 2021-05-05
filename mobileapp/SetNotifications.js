import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {Platform} from "react-native";
import {setExpoPushToken} from "./redux/slices/executingSlice";

export function setNotificationsBackground() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
}

export async function schedulePushNotificationFriendsClose(newFriends) {
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New friends are close to you!",
      body: "Find out who :)",
      data: {data: "goes here"},
    },
    trigger: {seconds: 2},
  });

  console.log("Notification sent");
}

export async function schedulePushNotificationFriends(newFriends) {

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New friends have joined Radarin!",
      body: "Aren't you curious about who joined the app?",
      data: {data: "goes here"},
    },
    trigger: {seconds: 2},
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}