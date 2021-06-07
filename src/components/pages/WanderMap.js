import React from "react";
import {StyleSheet, Text, View, TouchableHighlight, Dimensions} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

export default function WanderMap() {
    return (
        <MapView style={styles.map}
                 provider={PROVIDER_GOOGLE}
                 showsUserLocation
                 initialRegion={{
                     latitude: 48.5112,
                     longitude: 2.2055,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421
                 }}/>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});