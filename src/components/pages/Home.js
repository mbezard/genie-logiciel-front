import { auto } from "async";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, VirtualizedList, TouchableOpacity, Button } from "react-native";
import {Chip} from "react-native-elements"
import { useSelector } from "react-redux";
import { userSelector } from "../utils/store/user/userSelector";
import styleUtils, {margin, padding} from "../utils/styleUtils";

const mockPlaces = [
    {id: 1, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 2, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 3, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 4, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 5, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 6, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 7, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
]

export default function Home({navigation}) {
    const user = useSelector(userSelector)
    const [places, setPlaces] = useState(mockPlaces)

    const headerList = () => (
        
        <View style={styleUtils.columnFlex}>
            <View style={styles.buttonContainer}>
                <Button color="orange" title="Modifier mes préférences" onPress={() => navigation.navigate("Profile")}/>
            </View>
            
            <View style={styles.tagsContainer}>

                {user.tags.map((tag, i) =>(
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
        
    )

    return (<SafeAreaView style={styleUtils.containerCenter}>
        {
            (user.isLogged && places && Array.isArray(user.tags)) ? (
                <View style={styles.safeAreaContainer}>
                    
                    
                    <VirtualizedList
                        ListHeaderComponent={headerList}
                        data={places}
                        initialNumToRender={6}
                        renderItem={(place) => placeItem(place.item)}
                        keyExtractor={place => place.id.toString()}
                        getItemCount={(data) => data.length}
                        getItem={getItem}
                    />
                    
                    
                </View>
            )
            : (
            <View style={styleUtils.columnFlex}>
                <Text style={styles.titleText}>
                    Veuillez vous authentifier
                </Text>
                <View style={styles.choiceContainer}>
                    <Text>Déjà un Compte :</Text>
                    <Button title="Se connecter" color="orange" onPress={() => navigation.navigate("SignIn")} />

                </View>
                <View style={styles.choiceContainer}>
                    <Text>Aucun Compte :</Text>

                    <Button title="S'inscrire" color="orange" onPress={() => navigation.navigate("SignUp")}/>
                </View>
            </View>)
        }
    </SafeAreaView>)
}

const getItem = (data, index) => data[index]

const placeItem = (place) => {
    
    return (
    <TouchableOpacity activeOpacity={0.5} style={styles.placeButton} onPress={() => console.log("go to page place details with id=" + place.id)} >
        <View style={styles.placeContainer}>
            <Image 
                style={styles.image} 
                source={{
                    uri: place.image,
                }}
                resizeMode="contain"
             />
            <View>
                <Text style={styles.titlePlace}>
                    {place.title}
                </Text>
                <Text style={place.addressPlace}>
                    {place.address}
                </Text>
            </View>
        </View>
        
    </TouchableOpacity>)
}


const styles = StyleSheet.create({
    placeButton:{
    },
    placeContainer:{
        margin:5,
        padding: 10,
        flex:1,
        flexDirection: "row",
    },
    titlePlace:{
        fontSize:22
    },
    addressPlace:{
        fontSize:18,
    },
    image:{
        height: 80,
        width:130,
        marginRight: 5,
    },
    tagContainer: {
        ...margin(5, 7),
        ...padding(0,4)
    },
    tagTitle: {
        color: "grey",
        fontWeight:"bold"
    },
    tagButton: {
        backgroundColor: "#d0d0d0",
        borderColor: "#d0d0d0",
        ...padding(5,20)
    },
    tagsContainer:{
        flex:1,
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    safeAreaContainer:{
        flex:1, 
        flexDirection:"column", 
        alignItems:"center"
    },
    buttonContainer:{
        ...margin(30, 0),
        width:250,
    },
    choiceContainer: {
        marginVertical: 10,
        width: "40%",
    },
    titleText: {
        fontSize: 32,
        textAlign:"center",
        ...margin(0,10,60,10),
    },
})