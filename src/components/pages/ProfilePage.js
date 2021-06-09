import React from "react";
import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import Profile from "./Profile";
import VisitorHome from "./VisitorHome";
import {createStackNavigator} from "@react-navigation/stack";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {View} from "react-native";
import stylesUtils from "../utils/styleUtils";

export default function ProfilePage() {
    const user = useSelector(userSelector);
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="VisitorHome" component={VisitorHome}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Navigator>
    )
}
