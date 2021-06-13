import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, Image, SafeAreaView, VirtualizedList, TouchableOpacity, Button} from "react-native";
import {Chip, Divider, Icon} from "react-native-elements"
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import styleUtils, {margin, padding} from "../utils/styleUtils";
import {getLocationAsync} from "../utils/location";
import {getPlacesFromTags} from "../utils/requests/place";
import {addPlaces} from "../utils/store/user/userActions";


export default function Home({navigation}) {
    const dispatch = useDispatch();
    const user = useSelector(userSelector)
    const [updateValue, setUpdateValue] = useState(0);
    const update = () => setUpdateValue((prevState => prevState + 1))
    const [location, setLocation] = useState();
    useEffect(() => {
        getLocationAsync(setLocation).catch()
    }, [updateValue])
    useEffect(() => {
        if (location !== undefined) {
            getPlacesFromTags(user.tags, location.latitude, location.longitude).then((value => {
                // console.log("places", value)
                dispatch(addPlaces(value))
            }))
        }
    }, [location])
    // console.log("location1", location)

    const headerList = () => (

        <View style={{flex: 1}}>
            <View style={[styles.header]}>
                <Text style={styles.headerTitle}>Recherche</Text>
                <Icon style={styles.icon}
                      iconStyle={styles.iconStyle}
                      rounded
                      size={60}
                      color={"white"}
                      type={"font-awesome"}
                      name={"search"}/>
            </View>

            <View style={[styleUtils.containerCenter]}>
                <Text style={{fontSize: 20}}>Voici vos tags : </Text>
                <Text style={{fontSize: 15}}>Les tags peuvent etre modifiés sur votre page Profil</Text>
            </View>

            <View style={styles.tagsContainer}>

                {user.tags.map((tag) => (
                    <Chip iconRight
                          key={tag.id}
                          title={tag.title}
                          titleStyle={styles.tagTitle}
                          containerStyle={styles.tagContainer}
                          buttonStyle={styles.tagButton}
                          type={"outline"}
                    />
                ))}
                {/*<View style={styles.buttonContainer}>*/}
                {/*    <Button color="orange" title="Modifier mes préférences"*/}
                {/*            onPress={() => navigation.navigate("Profile", {screen: "ProfilePage", initial: false,})}/>*/}
                {/*</View>*/}
            </View>
            <View style={styles.searchButtonContainer}>
                <Button color={"orange"} title={"Lancer la Recherche"} onPress={() => update()}/>

            </View>
            <Divider style={styles.dividerSmall}/>
        </View>

    )


    const getItem = (data, index) => data[index]

    const placeItem = (place) => {
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.placeButton}
                              onPress={() => console.log("go to page place details with id=" + place.id)}>
                <View style={styles.placeContainer}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg",
                        }}
                        resizeMode="contain"
                    />
                    <View>
                        <Text style={styles.titlePlace}>
                            {place.title}
                        </Text>
                        <Text style={place.addressPlace}>
                            {place.address || "Pas d'adresse"}
                        </Text>
                        <Text style={styles.tagAsText} num>
                            {place.tags?.map((tag) => (tag.title + ", "))}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>)
    }
    return (<SafeAreaView style={styleUtils.containerCenter}>
        {
            (user.isLogged && user.places && Array.isArray(user.tags)) ? (
                    <View style={styles.safeAreaContainer}>

                        <VirtualizedList
                            ListHeaderComponent={headerList}
                            data={user.places}
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
                            <Button title="Se connecter" color="orange" onPress={() => navigation.navigate("SignIn")}/>

                        </View>
                        <View style={styles.choiceContainer}>
                            <Text>Aucun Compte :</Text>

                            <Button title="S'inscrire" color="orange" onPress={() => navigation.navigate("SignUp")}/>
                        </View>
                    </View>)
        }
    </SafeAreaView>)

}
const styles = StyleSheet.create({
    tagAsText: {
        flex: 1,
        fontSize: 10,
        color: "grey",
        width: 220
    },
    searchButtonContainer: {
        ...padding(0, 30)
    },
    dividerSmall: {
        ...margin(10, 40, 10, 40)
    },
    iconStyle: {
        borderRadius: 100,
        borderWidth: 3,
        borderColor: "white",
        ...padding(25)
    },
    icon: {
        marginBottom: 30,
        marginTop: 20
    },
    header: {
        backgroundColor: "orange",
        height: 200,
        marginBottom: 75
    },
    headerTitle: {
        marginTop: 50,
        textAlign: "center",
        color: "white",
        fontSize: 55,
        fontWeight: "600"
    },
    placeButton: {},
    placeContainer: {
        margin: 5,
        padding: 10,
        flex: 1,
        flexDirection: "row",
    },
    titlePlace: {
        fontSize: 22
    },
    addressPlace: {
        fontSize: 18,
    },
    image: {
        height: 80,
        width: 130,
        marginRight: 5,
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
    tagsContainer: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        ...padding(5),
        ...margin(5),
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "gray",
    },
    safeAreaContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    buttonContainer: {
        ...margin(40, 0),
        width: 250,
    },
    choiceContainer: {
        marginVertical: 10,
        width: "40%",
    },
    titleText: {
        fontSize: 32,
        textAlign: "center",
        ...margin(0, 10, 60, 10),
    },
})
