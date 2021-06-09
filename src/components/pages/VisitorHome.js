import React from "react";
import {Text, View, Button, StyleSheet} from "react-native";
import {Link} from "react-router-native";

export default function VisitorHome() {
    return (<View style={styles.mainContainer}>
        <Text style={styles.titleText}>
            Bienvenue sur Wander !
        </Text>
        <Text style={styles.subtitle}>
            Veuillez vous authentifier :
        </Text>
        <View style={styles.choiceContainer}>
            <Text>Déjà un Compte :</Text>
            <Link to="/signIn" underlayColor="none" style={styles.buttonLink}>
                <Button title="Se connecter" color="orange"/>
            </Link>
        </View>
        <View style={styles.choiceContainer}>

            <Text>Aucun Compte :</Text>
            <Link to="/profile" underlayColor="none" style={styles.buttonLink}>

                <Button title="S'inscrire" color="orange"/>

            </Link>
            <View>

            </View>
        </View>

    </View>)
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    titleText: {
        fontSize: 32,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 70,
    },
    buttonLink: {
        marginTop: 5,
        width: "100%"
    },
    button: {},
    choiceContainer: {
        marginVertical: 10,
        width: "40%",
    },
    highlightView: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }

})
