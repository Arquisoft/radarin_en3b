import React from "react";
import { useSelector } from "react-redux";
import styles from "../MyStyles";
import { Text, TouchableOpacity, Image, Share } from "react-native";
import { Card } from "react-native-elements";
import { DataTable } from "react-native-paper";

export default function MyFarFriendsCard() {
    const friends = useSelector(state => state.user.friends);

    let farFriends = [];

    if (friends !== "No location")
        farFriends = friends.filter(friend => !friend.isClose);

    const shareApp = async () => {
        try {
            const result = await Share.share({
                message:
                    "Hello, I'm using Radarin, would you like to try and join? https://radarinen3bwebapp.herokuapp.com/",
            });
        } catch (error) {
            alert(error.message);
        }
    };

    if (friends.length === 0 || friends === "No location") {
        return (
            <Card containerStyle={styles.nofriendscard}>
                <Card.Title style={styles.cardTitle}>Seems like you don't have any friend that uses Radarin.</Card.Title>
                <Card.Divider style={styles.divider} />
                <Text style={styles.name}>Would you like to invite them?</Text>
                <TouchableOpacity style={styles.sharebutton} onPress={shareApp}>
                    <Image source={require("../assets/share.png")} style={styles.icon} />
                </TouchableOpacity>
            </Card>
        );
    } else {
        return (
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Disconnected or far from you</Card.Title>
                <Card.Divider style={styles.divider} />
                <DataTable>
                    {
                        farFriends.map((friend) => {
                            return (
                                <DataTable.Row key={friend.name}>
                                    <DataTable.Cell><Text style={styles.name}>{friend.name}</Text></DataTable.Cell>
                                </DataTable.Row>
                            );
                        })
                    }

                </DataTable>
            </Card>
        );
    }
}