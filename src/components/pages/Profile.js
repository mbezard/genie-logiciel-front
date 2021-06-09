import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";

export default function Profile() {
    const user = useSelector(userSelector);
    return (<View>
        <Text>Page de profile</Text>
        <Text>{JSON.stringify(user)}</Text>
    </View>)
}
