import React, {useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";

export default function WanderMap() {
    const LATITUDE_DELTA = 0.0142;
    const LONGITUDE_DELTA = 0.0102;

    const [position, setPosition] = useState({
        latitude: 48.853562,
        longitude: 2.348094,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    return (
        <MapView style={styles.map}
                 provider={PROVIDER_GOOGLE}
                 showsUserLocation
                 initialRegion={position}/>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});