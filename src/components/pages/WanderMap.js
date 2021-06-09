import React, {useEffect, useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import {getLocationAsync} from "../utils/location";

export default function WanderMap() {
    const LATITUDE_DELTA = 0.0142;
    const LONGITUDE_DELTA = 0.0102;

    const [location, setLocation] = useState({
        latitude: 48.853562,
        longitude: 2.348094,
    });

    useEffect(() => {
        getLocationAsync(setLocation).catch(err => console.log(err));
    }, []);

    return (
        <MapView style={styles.map}
                 provider={PROVIDER_GOOGLE}
                 showsUserLocation
                 followsUserLocation
                 region={{
                     latitude: location.latitude,
                     longitude: location.longitude,
                     latitudeDelta: LATITUDE_DELTA,
                     longitudeDelta: LONGITUDE_DELTA
                 }}/>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});