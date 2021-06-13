import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import PlaceDetail from "./PlaceDetail";
import WanderMap from "./WanderMap";

export default function MapRouter() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="WanderMap" component={WanderMap}/>
            <Stack.Screen name="PlaceDetails" component={PlaceDetail}/>
        </Stack.Navigator>
    );
}