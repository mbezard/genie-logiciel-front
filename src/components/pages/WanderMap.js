import React, {useEffect, useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from "expo-location";

export default function WanderMap() {
    const LATITUDE_DELTA = 0.0142;
    const LONGITUDE_DELTA = 0.0102;

    const [location, setLocation] = useState({
        latitude: 48.853562,
        longitude: 2.348094,
    });

    const getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
            .catch(err => console.log(err));
        if (status !== 'granted') {
            throw new Error("Permission to access location was denied");
        }

        let locationObject = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            .catch(err => console.log(err));
        setLocation({latitude: locationObject.coords.latitude, longitude: locationObject.coords.longitude});
    }

    useEffect(() => {
        getLocationAsync().catch(err => console.log(err));
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