import * as Location from "expo-location";

export const getLocationAsync = async (locationSetter) => {
    let { status } = await Location.getForegroundPermissionsAsync()
        .catch(err => console.log(err))
    if (status !== 'granted') {
        let permission = await Location.requestForegroundPermissionsAsync()
            .catch(err => console.log(err));
        if (permission.status !== 'granted') {
            throw new Error("Permission to access location was denied");
        }
    }

    let locationObject = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
        .catch(err => console.log(err));
    locationSetter({latitude: locationObject.coords.latitude, longitude: locationObject.coords.longitude});
}

export const checkMarkersProximity = (location, markers) => {
    for (const marker of markers) {
        if (measure(location.coords.latitude, location.coords.longitude, marker.coords.latitude, marker.coords.longitude) < 16) {
            return marker;
        }
    }
}

// Function from https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    let R = 6378.137; // Radius of earth in KM
    let dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    let dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d * 1000; // meters
}