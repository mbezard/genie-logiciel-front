import React, {useEffect, useState} from "react";
import {StyleSheet, Dimensions, View} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {getLocationAsync} from "../utils/location";
import {Button} from "react-native-elements";
import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {getPlacesFromTags} from "../utils/requests/place";
import {getColorLabelFromScore} from "../utils/utilsFunctions";

export default function WanderMap() {
    const user = useSelector(userSelector);

    const [location, setLocation] = useState({
        latitude: 48.853562,
        longitude: 2.348094,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const places = user.places;
        if (places.length > 0) {
            const max = places.map(elem => elem.score).reduce((previousValue, currentValue) => (previousValue > currentValue ? previousValue : currentValue), 1)
            if (places.length > 0) {
                setMarkers(places.map(place => {
                    // console.log(place.score, " < " , max, " -> ", getColorLabelFromScore(place.score, max))
                    return {
                        title: place.title,
                        description: "score: " + place.score,
                        color: getColorLabelFromScore(place.score, max),
                        coords: {
                            latitude: place.latitude,
                            longitude: place.longitude
                        }
                    }
                }))
            }
        }
    }, [user])

    useEffect(() => {
        getLocationAsync(setLocation).catch(err => console.log(err));
    }, []);

    function handleRegionChange(region) {
        if (region.latitudeDelta !== location.latitudeDelta) {
            setLocation((prevLoc) => ({
                ...prevLoc,
                longitudeDelta: region.longitudeDelta,
                latitudeDelta: region.latitudeDelta
            }))
        }
    }

    return (
        <View>
            <MapView style={styles.map}
                     provider={PROVIDER_GOOGLE}
                     showsUserLocation={true}
                     followsUserLocation={true}
                     region={{
                         latitude: location.latitude,
                         longitude: location.longitude,
                         latitudeDelta: location.latitudeDelta,
                         longitudeDelta: location.longitudeDelta,
                     }}
                // onRegionChange={handleRegionChange}
                     showsPointsOfInterest={false}
                     toolbarEnabled={false}
                     loadingEnabled={true}>
                {markers.map((marker, index) => (
                    <MapView.Marker key={index}
                                    title={marker.title}
                                    pinColor={marker.color}
                                    coordinate={marker.coords}
                                    description={marker.description}/>
                ))}
            </MapView>
            <View style={styles.locationBtnContainer}>
                <Button buttonStyle={styles.locationBtn}
                        icon={{
                            type: "ionicon",
                            name: "navigate",
                            color: "blue",
                        }}
                        raised={true}
                        onPress={() => {
                            getLocationAsync(setLocation).catch(err => {
                                console.log(err)
                            })
                        }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    locationBtnContainer: {
        position: "absolute",
        top: 20,
        right: 20,
        borderRadius: 100,
    },
    locationBtn: {
        width: 50,
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 100,
    },
});
