import React from "react";
import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from "react-native";
import {Chip, Image} from "react-native-elements";
import {useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {margin} from "../utils/styleUtils";

const mockPlace = {
    title:"Arc de triomphe",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
    address:"Place Charles-de Gaulle",
    opinion: 4,
    tags: ["Monument", "Paris", "Guerre", ]
}


export default function PlaceDetail({route, navigation}) {
    const {place} = route.params;

    console.log(place);
    return (
        <View style={styles.mainContainer}>
            <Image
                source={{uri: place.url}}
                style={styles.placeImage}
                PlaceholderContent={<ActivityIndicator/>}
            />
            <View style={styles.informationContainer}>
                <Text style={styles.placeTitle}>{place.title}</Text>
                <Text style={styles.placeInfo}>Description : {place.description}</Text>
                <Text style={styles.placeInfo}>Adresse : {place.address}</Text>
                <View>
                    <Text style={styles.placeInfo}>Tags : </Text>
                    <View style={styles.tagsContainer}>
                        {place.tags.map(tag => (
                            <Chip iconRight
                                  key={tag.id}
                                  title={tag.title}
                                  titleStyle={styles.tagTitle}
                                  containerStyle={styles.tagContainer}
                                  buttonStyle={styles.tagButton}
                                  type={"outline"}
                            />
                        ))}
                    </View>
                </View>
            </View>
    </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        overflow: "scroll",
    },
    placeImage:{
        maxHeight: Dimensions.get("window").height / 2,
    },
    informationContainer:{
        backgroundColor:"orange",
        width: Dimensions.get("window").width,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    placeTitle:{
        fontSize:30,
        textAlign:"center",
        padding: 10,
        marginBottom:20,
    },
    placeInfo:{
        fontSize:20,
        marginVertical:10,

    },
    tagsContainer:{
       flex:1,
       flexDirection:"row",
       justifyContent:"center",
       flexWrap:"wrap",
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        flexGrow: 3,
        ...margin(5, 7),
        // ...padding(0, 4)
    },
    tagTitle: {
        color: "grey",
        fontWeight: "bold"
    },
    tagButton: {
        backgroundColor: "#d0d0d0",
        borderColor: "#d0d0d0",
        // ...padding(5, 20)
    },
})