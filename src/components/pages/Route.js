import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import WanderMap from "./WanderMap";
import Home from "./Home";
import Profile from "./Profile";
import AddPlace from "./AddPlace";
import ProfilePage from "./ProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {getUserInfos} from "../utils/store/user/userActions";

export default function Route() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    if(!user.isLogged) {
        AsyncStorage.getItem("authJwtToken").then(data => {
            if(data && !user.isLogged) {
                const token = data;
                axios.defaults.headers.common['Authorization'] = token;
                dispatch(getUserInfos(token))
            }
        }).catch()
    }




    const Tab = createBottomTabNavigator();



    return(
        <SafeAreaView style={styles.mainContainer}>
            <NavigationContainer style={styles.container}>
                <Tab.Navigator style={styles.mainView}
                               screenOptions={({route}) => ({
                                   tabBarIcon: ({focused, color, size}) => {
                                       if (route.name === 'Home') {
                                           return (
                                               <Ionicons
                                                   name={focused ? 'home' : 'home-outline'}
                                                   size={size}
                                                   color={color}/>
                                           );
                                       } else if (route.name === 'Map') {
                                           return (
                                               <Ionicons
                                                   name={focused ? 'map' : 'map-outline'}
                                                   size={size}
                                                   color={color}/>
                                           );
                                       } else if (route.name === 'ProfilePage') {
                                           return (
                                               <Ionicons
                                                   name={focused ? 'person-circle' : 'person-circle-outline'}
                                                   size={size}
                                                   color={color}/>
                                           );
                                       } else if (route.name === 'Proposer lieu') {
                                           return (
                                               <Ionicons
                                                   name={focused ? 'add-circle' : 'add-circle-outline'}
                                                   size={size}
                                                   color={color}/>
                                           );
                                       }
                                   },
                               })}
                               tabBarOptions={{
                                   activeTintColor: 'tomato',
                                   inactiveTintColor: 'gray',
                               }}>

                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Map" component={WanderMap}/>
                    <Tab.Screen name="ProfilePage" component={user.isLogged ? Profile : ProfilePage}/>
                    <Tab.Screen name="Proposer lieu" component={AddPlace}/>

                </Tab.Navigator>

            </NavigationContainer>

        </SafeAreaView>
    )
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
    }
});
