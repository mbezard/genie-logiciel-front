import React, {useState} from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import { Link } from "react-router-native";

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, errorText] = useState("");

    function submit() {
        console.log("submit")
    }

    return(<View style={styles.mainContainer}>
        <Text style={styles.title}>Inscription</Text>
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
            onChangeText={setConfirmPass}
            value={confirmPass}
            placeholder="Confirmer le Mot de passe"
            secureTextEntry={true}
        />

        <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
                {error}
            </Text>
        </View>

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
        marginBottom: 50,
        width:"50%"
    },
    signOutText:{
        textDecorationLine:"underline",
    },
    errorContainer:{
        fontSize:12,
    },
    errorText:{
        marginTop: 15,
        color:"red",
        marginBottom: 5,
    }
});