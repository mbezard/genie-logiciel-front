import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Link } from "react-router-native";

const mockPlace = {
    title:"Arc de triomphe",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
    address:"Place Charles-de Gaulle",
    opinion: 4,
    tags: ["Monument", "Paris", "Guerre", ]
}


export default function PlaceDetail() {
    return (<View style={styles.mainContainer}>
        <Image
            source= {{uri: mockPlace.image}}
            style={styles.placeImage}
        />
        <View style={styles.informationContainer}>
            <Text style={styles.placeTitle}>{mockPlace.title}</Text>
            <Text style={styles.placeInformation}>Adresse : {mockPlace.address}</Text>
            <Text style={styles.placeInformation}>Avis : {mockPlace.opinion}/5</Text>
            <Text style={styles.placeInformation}>Tags : </Text>
            <View style={styles.tagsContainer}>
                {mockPlace.tags.map(tag => (<View style={styles.tagView}>
                    <Text style={styles.tagText}>
                        {tag}
                    </Text>
                </View>))}
            </View>
            <View style={styles.buttonContainer}>
                <Link style={styles.buttonLink}>
                    <Button title="Se rendre au lieu d'interet" color="blue"/>
                </Link>
            </View>
            
        </View>
    </View>)
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center",
        width: "100%",
        height:"100%",
    },
    placeImage:{
        width:"100%",
        height:270,
        borderWidth:1,
    },
    informationContainer:{
        flex:1,
        margin:"5%",
        paddingVertical:10,
        paddingHorizontal: 10,
        width:"90%",
        height:"57%",
        backgroundColor:"#FFBB63AA",
    },
    placeTitle:{
        fontSize:28,
        textAlign:"center",
        marginBottom:20,
    },
    placeInformation:{
        fontSize:20,
        marginVertical:10,

    },
    tagsContainer:{
       flex:1,
       flexDirection:"row",
       justifyContent:"center",
       flexWrap:"wrap",
    },
    tagView:{
        backgroundColor:"#F79E3E",
        paddingVertical:3,
        paddingHorizontal:15,
        marginHorizontal:6,
        marginVertical: 10,
        borderRadius: 20,
        borderWidth: 3,
        borderColor:"#000357"
    },
    tagText:{
        color:"black",
        fontSize:16,
    },
    buttonLink:{
        width:"70%"
    },
    buttonContainer:{
        flex:1,
        alignItems:"center"
    }

})