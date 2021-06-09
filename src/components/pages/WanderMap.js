import React, {useEffect, useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {getLocationAsync} from "../utils/location";

export default function WanderMap() {
    const LATITUDE_DELTA = 0.0142;
    const LONGITUDE_DELTA = 0.0102;

    const [location, setLocation] = useState({
        latitude: 48.853562,
        longitude: 2.348094,
    });
    // TODO: do not forget to delete the initial state when connected to DB
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
                 }}>
            {markers.map((marker, index) => (
                <Marker key={index}
                        title={marker.title}
                        coordinate={marker.coords}
                        description={marker.description}/>
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});