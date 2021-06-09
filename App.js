import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Home from "./src/components/pages/Home";
import Profile from "./src/components/pages/Profile";
import WanderMap from "./src/components/pages/WanderMap";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import {Provider} from "react-redux";
import store from "./src/components/utils/store/store";

export default function App() {
    const Tab = createBottomTabNavigator();
    return (<>
        <Provider store={store}>
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
                                           } else if (route.name === 'Profile') {
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
                        <Tab.Screen name="Profile" component={Profile}/>
                        <Tab.Screen name="Proposer lieu" component={Profile}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        </Provider>
    </>);
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
