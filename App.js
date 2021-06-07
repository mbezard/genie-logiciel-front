import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Link, NativeRouter, Route} from "react-router-native";
import Home from "./src/components/pages/Home";
import Profile from "./src/components/pages/Profile";
import SignIn from './src/components/pages/SignIn';
import SignUp from './src/components/pages/SignUp';
import VisitorHome from './src/components/pages/VisitorHome';
import WanderMap from "./src/components/pages/WanderMap";
import {padding} from "./src/components/utils/utils";
import {Provider} from "react-redux";
import store from "./src/components/utils/store/store";

export default function App() {
    return (<>
            <Provider store={store}>
                <SafeAreaView style={styles.mainContainer}>
                    <NativeRouter>
                        <View style={styles.container}>
                            <View style={styles.mainView}>
                                <Route exact path="/" component={Home}/>
                                <Route path="/map" component={WanderMap}/>
                                <Route path="/profile" component={Profile}/>
                            </View>
                            {/* Header : */}
                            <View style={styles.navbar}>
                                <Link to="/" underlayColor="#f0f4f7">
                                    <Text style={styles.navItem}>Home</Text>
                                </Link>
                                <Link to="/map" underlayColor="#f0f4f7">
                                    <Text style={styles.navItem}>Map</Text>
                                </Link>
                                <Link to="/profile" underlayColor="#f0f4f7">
                                    <Text style={styles.navItem}>Profile</Text>
                                </Link>

                        </Link>
                            <Text style={styles.navItem}>SignUp</Text>
                        <Link to="/signUp" underlayColor="#f0f4f7">
                        </Link>
                            <Text style={styles.navItem}>SignIn</Text>
                        <Link to="/signIn" underlayColor="#f0f4f7">
                        </Link>
                            <Text style={styles.navItem}>Home</Text>
                        <Link to="/visitorHome" underlayColor="#f0f4f7">
                    </View>

                        </View>
                    </NativeRouter>

                </SafeAreaView>
            </Provider>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    navbar: {
        ...padding(4),
        flexDirection: "row",
        backgroundColor: "orange",
        borderWidth: 1,
        borderColor: "grey",
    },
    navItem: {
        ...padding(4, 8, 4, 8)
    }
});
