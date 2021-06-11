import React, {useCallback, useState} from "react";
import { Text, View, Button, TextInput, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {useDispatch} from "react-redux";
import {loginAttempt} from "../utils/store/user/userActions";

export default function SignIn({navigation}) {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const dispatch = useDispatch()

    const logUser = useCallback((username, password) => {
        dispatch(loginAttempt(username, password))
    }, [dispatch])

    function submit() {
        console.log("submit", email, pass)
        logUser(email, pass)
    }

    return (<View style={styles.mainContainer}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput
            style={styles.input}
            autoCompleteType="email"
            onChangeText={setEmail}
            value={email}
            placeholder="Adresse Mail"
        />
        <TextInput
            style={styles.input}
            autoCompleteType="password"
            onChangeText={setPass}
            value={pass}
            placeholder="Mot de passe"
            secureTextEntry={true}
        />
        <View style={styles.submitButton}>
            <Button
                title="Se connecter"
                onPress={submit}
                color="orange"
            />
        </View>


        <Text>
            Pas encore de Compte ?
        </Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("SignUp")}>
            <Text style = {styles.signOutText}>
                Identifiez-vous
            </Text>
        </TouchableWithoutFeedback>
    </View>)


}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        width:"100%",
    },
    title:{
        fontSize:36,
        marginBottom:40,
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
        marginTop: 20,
        marginBottom: 70,
        width:"50%"
    },
    signOutText:{
        textDecorationLine:"underline",
    }
});
