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
  console.log("Sending notification");
  let friendsStr;
  if (newFriends.length === 1) {
    friendsStr = newFriends[0] + " is now close to you.";
  } else {
    friendsStr = newFriends.slice(0, newFriends.length - 2).reduce((str, friend) => str.concat(`${friend}, `));
    friendsStr
            += `${newFriends[newFriends.length - 2]} and ${newFriends[newFriends.length - 1]} are now close to you.`;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New friends are close to you!",
      body: friendsStr,
      data: {data: "goes here"},
    },
    trigger: {seconds: 2},
  });

  console.log("Notification sent");
}

export async function schedulePushNotificationFriends(newFriends) {
  let friendsStr;
  if (newFriends.length === 1) {
    friendsStr = newFriends[0] + " has started to use the app.";
  } else {
    friendsStr = newFriends.slice(0, newFriends.length - 2).reduce((str, friend) => str.concat(`${friend}, `));
    friendsStr
            += `${newFriends[newFriends.length - 2]} and ${newFriends[newFriends.length - 1]} have started to use the app.`;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New friends have joined Radarin!",
      body: friendsStr,
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