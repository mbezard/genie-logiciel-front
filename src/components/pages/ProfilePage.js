import React from "react";
import Profile from "./Profile";
import VisitorHome from "./VisitorHome";
import {createStackNavigator} from "@react-navigation/stack";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import AddPlace from "./AddPlace";

export default function ProfilePage() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="VisitorHome" component={VisitorHome}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="SignIn" component={SignIn}/>
        </Stack.Navigator>
    )
}
