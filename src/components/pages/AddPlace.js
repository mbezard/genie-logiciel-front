import React from "react";
import {useState} from "react";
import ReactDOM from "react-dom";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import {addNewPlace} from "../utils/requests/place";
import {StyleSheet, Text, Button, View, SafeAreaView} from "react-native";


export default function AddPlace() {
    
    const [nom, setNom] = useState("")
    const [adresse, setAdresse] = useState("")
    const [codePostal, setCodePostal] = useState("")
    const [inputTags, setTags] = useState("")
    

    function submit(){

        addNewPlace(nom, adresse, inputTags).then(r => {
            if(r.error && r.error?.status !== 200) {
                setError("Erreur 200")
                return;
            }
            setError(undefined);
            navigation.navigate("Home")
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Ajouter un lieu</Text>
            <View style={styles.inputContainer}>
                <Text>Nom</Text>
                <TextInput style={styles.input}
                    onChangeText={setNom}
                    value={nom}
                    placeholder="Nom du lieu"
                />
                <Text>Adresse</Text>
                <TextInput style={styles.input}
                    onChangeText={setAdresse}
                    value={adresse}
                    placeholder="Adresse du lieu"
                />
                <Text>Code postal</Text>
                <TextInput style={styles.input}
                    onChangeText={setCodePostal}
                    value={codePostal}
                    placeholder="Code Postal"
                />
                
                <Text>Tags</Text>
                <TextInput style={styles.input}
                    onChangeText={setTags}
                    value={inputTags}
                    placeholder="Un seul tag plz"
                />
                <View style={styles.submitButton}>
                <Button
                title="Envoyer le lieu"
                onPress={submit}
                color="orange"
                />
                </View>

                
            </View>
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer:{
        marginVertical: 30,
    },
    input:{
        borderColor: "black",
        borderWidth: 1,
        width: Dimensions.get("window").width /1.8,
        padding: 3,
    },
    submitButton:{
        flexDirection:"row",
        marginTop: 20,
        marginBottom: 50,
        width:"50%",
        alignItems: "center",
        justifyContent: "center",
    },
});
