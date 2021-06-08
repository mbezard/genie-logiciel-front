import React from "react";
import {StyleSheet, Text, View, TouchableHighlight, Dimensions} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

export default function WanderMap() {
    return (
        <MapView style={styles.map}
                 provider={PROVIDER_GOOGLE}
                 showsUserLocation
                 initialRegion={{
                     latitude: 48.853562,
                     longitude: 2.348094,
                     latitudeDelta: 0.0142,
                     longitudeDelta: 0.0102
                 }}/>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});