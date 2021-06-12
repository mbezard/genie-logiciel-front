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
    const tags = user.tags;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = 0.02;

    const [location, setLocation] = useState({
        latitude: 48.853562,
        longitude: 2.348094,
    });
    const [markers, setMarkers] = useState([
        {
            title: "Maison de Jules Verne",
            description: "Maison de Jules Verne de la fin du XIXe siècle avec intérieurs préservés, effets personnels et jardin d'hiver.",
            coords: {
                latitude: 49.887793473576096,
                longitude: 2.301834244818648
            }
        },
        {
            title: "Gare d'Amiens",
            description: "Gare en béton sans rien de spécial.",
            coords: {
                latitude: 49.89053018319148,
                longitude: 2.3078890878191194
            }
        },
        {
            title: "Cathédrale d'Amiens",
            description: "Vaste édifice gothique du XIIIe connu pour sa décoration et ses sculptures somptueuses, 2 tours asymétriques.",
            coords: {
                latitude: 49.89464659106413,
                longitude: 2.3021637961507935
            }
        },
        {
            title: "Tour Eiffel",
            description: "Vaste édifice gothique du XIIIe connu pour sa décoration et ses sculptures somptueuses, 2 tours asymétriques.",
            coords: {
                latitude: 48.85834923524321,
                longitude: 2.294426777236882
            }
        },
        {
            title: "Big Fernand Montparnasse",
            description: "LA RÉOUVERTURE EST ARRIVÉE ! 🔔 L'atelier est à nouveau prêt à vous accueillir sur place (en terrasse et à l'intérieur) et bien sûr on continue la vente à emporter, le clique et collecte et la livraison ! En plus le couvre-feu est repoussé jusqu'à 23h donc vous avez largement le temps de venir vous régaler.",
            coords: {
                latitude: 48.84281041247653,
                longitude: 2.3265465718944665
            }
        }
    ]);

    useEffect(() => {
        getPlacesFromTags(tags).then(value => {
            const max = value.map(elem => elem.score).reduce((previousValue, currentValue) => (previousValue > currentValue ? previousValue : currentValue), 1)
            if (value.length > 0) {
                setMarkers(value.map(place => {
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
        })
    }, [user])

    useEffect(() => {
        getLocationAsync(setLocation).catch(err => console.log(err));
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
                         latitudeDelta: LATITUDE_DELTA,
                         longitudeDelta: LONGITUDE_DELTA
                     }}
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
