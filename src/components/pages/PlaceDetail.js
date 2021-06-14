import React from "react";
import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from "react-native";
import {Chip, Image} from "react-native-elements";
import {margin} from "../utils/styleUtils";
import testImg from "../../photo-85125609-024.jpg";

const mockPlace = {
    title:"Arc de triomphe",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
    address:"Place Charles-de Gaulle",
    opinion: 4,
    tags: ["Monument", "Paris", "Guerre", ]
}


export default function PlaceDetail({route, navigation}) {
    const {place} = route.params;

    // console.log(place);
    return (
        <View style={styles.mainContainer}>
            <Image
                source={{uri: place.url}}
                // source={testImg}
                style={styles.placeImage}
                PlaceholderContent={<ActivityIndicator/>}
            />
            <View style={styles.informationContainer}>
                <Text style={styles.placeTitle}>{place.title}</Text>
                <View style={styles.placeInfo}><Text style={styles.placeText}>Description : {"\n"}{place.description}</Text></View>
                <View style={styles.placeInfo}><Text style={styles.placeText}>Adresse : {"\n"}{place.address}</Text></View>
                <View style={styles.placeInfo}>
                    <Text style={styles.placeText}>Tags : </Text>
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
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "scroll",
    },
    placeImage:{
        // maxHeight: Dimensions.get("window").height / 2,
        width: 200,
        height: 300,
    },
    informationContainer:{
        backgroundColor:"orange",
        width: Dimensions.get("window").width,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
    },
    placeTitle:{
        fontSize:40,
        textAlign:"center",
        padding: 10,
        marginBottom: 30,
    },
    placeInfo:{
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 25,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        width: Dimensions.get("window").width * 0.85,
    },
    placeText: {
        fontSize:18,
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
