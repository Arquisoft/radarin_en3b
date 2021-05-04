import sign from "react-native-jwt-rsa";

export default async function () {
  const p = await SecureStore.getItemAsync("op234iyu5v6oy234iuv6");
  const parsed = JSON.parse(p);
  const userId = parsed.webId;
  const privateKey = parsed.privateKey;
  const payload = {
    sub: "test",
    webid: userId
  };
  return sign(privateKey, payload);
}