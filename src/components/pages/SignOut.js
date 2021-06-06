import React, {useState} from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function SignOut(){
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    function submit() {
        console.log("submit")
    }

    return(<View style={styles.mainContainer}>
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
        <TextInput
            style={styles.input}
            autoCompleteType="password"
            onChangeText={setPass}
            value={pass}
            placeholder="Confirmer le Mot de passe"
            secureTextEntry={true}
        />

        <View style={styles.submitButton}>
            <Button
                title="Créer un compte"
                onPress={submit}
                color="orange"
            />
        </View>

        <Text>
            Déjà un Compte ?
        </Text>
        <Link to="/signIn" underlayColor="#f0f4f7">
            <Text style = {styles.signOutText}>
                Se connecter
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
        marginVertical: 2,
    },
    submitButton:{
        marginTop: 20,
        marginBottom: 50,
        width:"50%"
    },
    signOutText:{
        textDecorationLine:"underline",
    }
});