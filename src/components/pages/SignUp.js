import React, {useState} from "react";
import {Text, View, Button, TextInput, StyleSheet, Alert} from "react-native";
import { Link } from "react-router-native";
import {attemptSignin} from "../utils/requests/auth";
import {margin, padding} from "../utils/utils";

export default function SignUp(){
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [error, setError] = useState()

    function submit() {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(email.toLowerCase())){
            setError("Email au mauvais format")
            return;
        }
        if (name.length < 3){
            setError("Nom trop court")
            return;
        }
        if( pass.length < 3) {
            setError("Mot de passe de moins de 3 caractères")
            return;
        }
        if(pass !== confirmPass) {
            setError("La confirmation du mot de passe ne correspond pas")
            return;
        }

        attemptSignin(name, pass, email).then(r => {
            if(r.error && r.error?.status !== 200) {
                setError("Mail deja pris")
                return;
            }
            setError(undefined);
            //todo rediriger vers le login
        })
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
            onChangeText={setName}
            value={name}
            placeholder="Nom"
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

        <View style={styles.submitButton}>
            <Button
                title="Créer un compte"
                onPress={submit}
                color="orange"
            />
            {error && <Text style={styles.alert}>{error}</Text>}
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
        marginTop: 20,
        marginBottom: 50,
        width:"50%"
    },
    signOutText:{
        textDecorationLine:"underline",
    },
    alert:{
        ...padding(0,20,0,20),
        ...margin(10,5,5,5),
        color: "red",
        backgroundColor: "rgba(255,165,165,0.35)"
    }
});
