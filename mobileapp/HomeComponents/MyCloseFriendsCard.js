import React from "react";
import { useSelector } from "react-redux";
import styles from "../MyStyles";
import { View, Text, Button, Linking } from "react-native";
import { Card } from "react-native-elements";
import { DataTable } from "react-native-paper";

export default function MyCloseFriendsCard({ navigation }) {
    const friends = useSelector(state => state.user.friends);

    let closeFriends = [];

    console.log(friends);
    if (friends !== null && friends[0].distance !== "No location")
        closeFriends = friends.filter(friend => friend.isClose);


    if (friends[0].distance == "No location") {
        return (
            <Card containerStyle={styles.nofriendscard}>
                <Card.Title style={styles.cardTitle}>Your location is not being taken</Card.Title>
                <Card.Divider style={styles.divider} />
                <Text style={styles.name}>Please, go to your profile and activate automatic location sending</Text>

                <View style={styles.cardButton}>
                    <Button color="#094072" title="Go to profile" onPress={() => {
                        navigation.navigate("Profile");
                    }
                    }>
                        Go to profile
         </Button>
                </View>
            </Card>
        );
    } else if (closeFriends.length > 0) {
        return (
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Friends close to your location</Card.Title>
                <Card.Divider style={styles.divider} />
                <DataTable>
                    {
                        closeFriends.map((friend) => {
                            return (
                                <DataTable.Row key={friend.name} onPress={() => Linking.openURL(friend.mapsUrl)}>
                                    <DataTable.Cell style={{ flex: 2 }}><Text style={styles.name}>{friend.name}</Text></DataTable.Cell>
                                    <DataTable.Cell><Text style={styles.name}>{friend.distance} m</Text></DataTable.Cell>
                                </DataTable.Row>
                            );
                        })
                    }

                </DataTable>
            </Card>
        );
    } else {
        return (
            <Card containerStyle={styles.nofriendscard}>
                <Card.Title style={styles.cardTitle}>Wops, you don't have any friend close to you right now</Card.Title>
                <Card.Divider style={styles.divider} />
                <Text style={styles.name}>Keep moving, you may find someone soon :)</Text>
            </Card>
        );
    }
}