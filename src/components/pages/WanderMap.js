import React, {useEffect, useState} from "react";
import {StyleSheet, Dimensions, View, Text} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {checkMarkersProximity, getLocationAsync} from "../utils/location";
import {Button, Overlay} from "react-native-elements";
import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {getPlacesFromTags} from "../utils/requests/place";
import {getColorLabelFromScore} from "../utils/utilsFunctions";
import * as Location from "expo-location";

export default function WanderMap({navigation}) {
    const user = useSelector(userSelector);

    const [location, setLocation] = useState({
        latitude: 48.853562,
        longitude: 2.348094,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });
    const [markers, setMarkers] = useState([]);
    const [reachedMarker, setReachedMarker] = useState({
        id:61,
        tags:[{id:2,title:"Musées"},{id:4,title:"Statues"}],
        title:"Test chat",
        address:"ici",
        coords: {
            latitude:48.85227,
            longitude: 2.308605,
        },
        description:"vide",
        url:"https://placekitten.com/200/300",
        score:200
    });
    const [overlayVisible, setOverlayVisible] = useState(true);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    }

    useEffect(() => {
        const places = user.places;
        if (places.length > 0) {
            const max = places.map(elem => elem.score).reduce((previousValue, currentValue) => (previousValue > currentValue ? previousValue : currentValue), 1)
            if (places.length > 0) {
                setMarkers(places.map(place => {
                    // console.log(place.score, " < " , max, " -> ", getColorLabelFromScore(place.score, max))
                    return {
                        id: place.id,
                        title: place.title,
                        description: place.description,
                        address: place.address,
                        url: place.url,
                        color: getColorLabelFromScore(place.score, max),
                        coords: {
                            latitude: place.latitude,
                            longitude: place.longitude
                        },
                        tags: place.tags,
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

    useEffect(() => {
        Location.watchPositionAsync(
            {accuracy: Location.LocationAccuracy.High, distanceInterval: 10},
            (location) => {
                let marker = checkMarkersProximity(location, markers);
                if (marker !== undefined) {
                    setReachedMarker(marker);
                    toggleOverlay();
                }
            })
            .catch(err => console.log(err));
    }, []);

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
            <Overlay isVisible={overlayVisible} onBackdropPress={() => toggleOverlay()} overlayStyle={styles.overlay}>
                <Text style={styles.overlayTitle}>
                    Félicitations, vous avez atteint {reachedMarker.title} !
                </Text>
                <Text style={styles.overlayText}>
                    Envie d'en savoir plus sur ce lieu ?
                </Text>
                <Button title={"J'en veux plus !"}
                        buttonStyle={styles.overlayBtn}
                        onPress={() => {navigation.navigate("Map", {screen: "PlaceDetails", params: {place: reachedMarker}})}}/>
            </Overlay>
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
    overlay: {
        width: Dimensions.get("window").width * 0.75,
        height: Dimensions.get("window").height / 3,
        backgroundColor: "#dbdbdb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 30,
    },
    overlayTitle: {
        fontSize: 30,
        textAlign: "center",
        paddingVertical: 10,
    },
    overlayText: {
        fontSize: 20,
        paddingVertical: 10,
        textAlign: "center",
    },
    overlayBtn: {
        backgroundColor: "orange",
        width: Dimensions.get("window").width / 3,
        borderRadius: 100,
    }
});
