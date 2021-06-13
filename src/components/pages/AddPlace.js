import React from "react";
import {useState, useEffect} from "react";
import { TextInput } from "react-native";
import {addNewPlace} from "../utils/requests/place";
import {Chip} from "react-native-elements"
import {StyleSheet, Text, Button, View, SafeAreaView, ScrollView} from "react-native";
import {userSelector} from "../utils/store/user/userSelector";
import {useSelector} from "react-redux";
import styleUtils, {margin} from "../utils/styleUtils"
import { getAllTags } from "../utils/requests/tags";
import { getLocationAsync } from "../utils/location";

export default function AddPlace({navigation}) {
    const user = useSelector(userSelector);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [inputTags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [location, setLocation] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        getAllTags().then(value => setAllTags(value));
        getLocationAsync(setLocation).catch(err => console.log(err));
    }, [])

    function handleNewTagClick(id) {
        const newTags = inputTags.concat(allTags.filter(tag => tag.id === id));
        setTags(newTags);
    }

    function handleRemoveTagClick(id) {
        const newTags = inputTags.filter(tag => tag.id !== id);
        setTags(newTags);
    }


    function submit(){
        if(name !== "" && address !== "" && description !== "" && inputTags.length !== 0){

            addNewPlace(name, address, description, inputTags, location, user.mail).then(r => {
                if(r.error && r.error?.status !== 200) {
                    setError("Network Error");
                    return;
                }
                setError("");
                navigation.navigate("Home");
            }).catch(err => {
                console.error(err)
                setError("Network Error");
            })
        }else{
            setError("Veuillez remplir l'ensemble des champs avant de valider")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            { (user.isLogged)?(
            <ScrollView>
            <View style={styles.subContainer}>
                <Text style={styles.title}>Ajouter un lieu</Text>

                <Text>Nom</Text>
                <TextInput style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Nom du lieu"
                />
                <Text>Adresse</Text>
                <TextInput style={styles.input}
                    onChangeText={setAddress}
                    value={address}
                    placeholder="Adresse du lieu"
                />
                <Text>Description</Text>
                <TextInput style={styles.descriptionInput}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description"
                    multiline={true}
                />

                <View style={styles.tagBox}>
                {
                    inputTags?.length > 0 ?

                        inputTags?.map((elem, i) => (

                            <Chip iconRight
                                key={i}
                                title={elem.title}
                                titleStyle={styles.tagTitle}
                                containerStyle={styles.tagContainer}
                                buttonStyle={styles.tagButton}
                                type={"outline"}
                                onPress={() => handleRemoveTagClick(elem.id)}
                                icon={{
                                    name: "close",
                                    type: "font-awesome",
                                    size: 20,
                                    color: "black",
                                }
                            }/>
                        ))
                    :
                    <View style={styleUtils.containerCenter}>
                        <Text style={{color: "gray"}}>No tags selected</Text>
                    </View>
                }
                </View>
                <View style={styles.tagBox}>
                    {
                        allTags.filter(tag => !inputTags.some(userTag => userTag.id === tag.id)).map((elem, i) => (

                            <Chip iconRight
                                key={i}
                                title={elem.title}
                                titleStyle={styles.tagTitleOff}
                                containerStyle={styles.tagContainer}
                                buttonStyle={styles.tagButtonOff}
                                onPress={() => handleNewTagClick(elem.id)}
                                type={"outline"}
                                icon={{
                                    name: "plus",
                                    type: "font-awesome",
                                    size: 20,
                                    color: "gray",
                                }}/>
                        ))
                    }
                </View>
                {error !== "" ? <View><Text style={styles.error}>{error}</Text></View> : <></>}
                <View style={styles.submitButton}>
                    <Button
                        style={{marginBottom:20}}
                    title="Envoyer le lieu"
                    onPress={submit}
                    color="orange"
                    />
                </View>
            </View>
            </ScrollView>)
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
    },
    subContainer:{
        width:"100%",
        flex:1,
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        fontSize: 28,
        ...margin(40,0,40,0)
    },
    input:{
        borderWidth: 1,
        borderColor: "#CCCCCC",
        height:40,
        paddingLeft:10,
        width:"75%",
        marginVertical: 2,
    },
    submitButton:{
        flexDirection:"row",
        marginTop: 20,
        width:"50%",
        alignItems: "center",
        justifyContent: "center",
    },
    tagBox: {
        flex:1,
        flexDirection: "row",
        flexWrap: "wrap",
        ...margin(20,0, 10, 0),
    },
    tagContainer: {
        ...margin(5, 2, 5, 2),
        flexGrow: 2
    },
    tagTitle: {
        color: "black",
    },
    tagButton: {
        backgroundColor: "#9e9e9e",
        borderColor: "#9e9e9e",
    },
    tagButtonOff: {
        backgroundColor: "#d0d0d0",
        borderColor: "#d0d0d0",
    },
    tagTitleOff: {
        color: "grey",
    },
    error:{
        color:"red",
    },
    descriptionInput:{
        borderWidth: 1,
        borderColor: "#CCCCCC",
        minHeight:40,
        paddingLeft:10,
        width:"75%",
        marginVertical: 2,
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
});
