import * as Location from "expo-location";

export const getLocationAsync = async (locationSetter) => {
    let { status } = await Location.requestForegroundPermissionsAsync()
        .catch(err => console.log(err));
    if (status !== 'granted') {
        throw new Error("Permission to access location was denied");
    }

    let locationObject = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
        .catch(err => console.log(err));
    locationSetter({latitude: locationObject.coords.latitude, longitude: locationObject.coords.longitude});
}