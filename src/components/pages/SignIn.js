import React, {useState} from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    function submit() {
        console.log("submit")
    }

    return (<View style={styles.mainContainer}>
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
        <Link to="/signOut">
            <Text style = {styles.signOutText}>
                Identifiez-vous
            </Text>
        </Link>
    </View>)

    
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        width:"100%",
        borderWidth:1
    },
    input:{
        borderWidth: 1,
        borderColor: "#CCCCCC",
        height:40,
        paddingLeft:10,
        width:"75%",
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