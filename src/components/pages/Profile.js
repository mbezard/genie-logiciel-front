import React, {useCallback, useState} from "react";
import {Text, View, Button, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {getUserInfos, logout} from "../utils/store/user/userActions";
import styleUtils, {margin} from "../utils/styleUtils";
import {Avatar, Chip, Divider, Icon, Input, Overlay} from "react-native-elements";
import {modifyUser} from "../utils/requests/auth";

export default function Profile({navigation}) {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigation.navigate("Home")
    }, [dispatch]);
    const updateUserInfos = useCallback(() => {
        dispatch(getUserInfos());
    }, [dispatch])
    const [editingObject, setEditingObject] = useState({isEditing: false, field: null, label: "", setter: undefined});
    const [error, setError] = useState();
    console.log(editingObject)

    const handleNameEditPress = () => {
        setEditingObject({
            isEditing: true,
            label: "Name",
            onSubmit: (value) => {
                modifyUser({name: value})
                    .then(() => {
                        updateUserInfos();
                        setEditingObject({isEditing: false})
                    })
                    .catch((error) => console.log(error))
            },
        })
    }
    const handleMailEditPress = () => {
        setEditingObject({
            isEditing: true,
            label: "Mail",
            onSubmit: (value) => {
                modifyUser({mail: value})
                    .then(() => {
                        handleLogout()
                        updateUserInfos();
                        setEditingObject({isEditing: false});
                    })
                    .catch((error) => console.log(error))
            },
        })
    }

    const handlePasswordEditPress = () => {
        setEditingObject({
            isEditing: true,
            label: "Password",
            onSubmit: (value) => {
                modifyUser({password: value})
                    .then(() => {
                        updateUserInfos();
                        setEditingObject({isEditing: false})
                    })
                    .catch((error) => console.log(error))
            },
        })
    }

    return (
        <SafeAreaView>
            <ScrollView>

                <View style={[styles.header]}>
                    <Text style={styles.headerTitle}>Votre profile</Text>
                </View>
                <Avatar containerStyle={styles.avatar}
                    // title={"PP"}
                        activeOpacity={0.5} size={"xlarge"}
                        rounded
                        icon={{name: "user", type: "font-awesome"}}/>

                <View style={styles.body}>
                    <View style={styleUtils.inlineFlex}>
                        <Text style={styles.label}>Your name : </Text>
                        <Text style={styles.field}>{user?.name}</Text>
                        <Icon reverse raised name={"edit"} type={"font-awesome"} color={"orange"} size={15}
                              onPress={handleNameEditPress}/>
                    </View>

                    <View style={styleUtils.inlineFlex}>
                        <Text style={styles.label}>Your mail : </Text>
                        <Text style={styles.field}>{user?.mail}</Text>
                        <Icon reverse raised name={"edit"} type={"font-awesome"} color={"orange"} size={15}
                              onPress={handleMailEditPress}/>
                    </View>

                    <View style={styleUtils.inlineFlex}>
                        <Text style={styles.label}>Your password : </Text>
                        <Text style={styles.field}>***</Text>
                        <Icon reverse raised name={"edit"} type={"font-awesome"} color={"orange"} size={15}
                              onPress={handlePasswordEditPress}/>
                    </View>

                    <Divider style={styles.divider}/>

                    <View style={styleUtils.inlineFlex}>
                        <Text style={styles.label}>Your favorite tags : </Text>
                        <Icon reverse raised name={"edit"} type={"font-awesome"} color={"orange"} size={15}/>
                    </View>
                    <View style={styles.tagBox}>
                        {
                            ["tag long 1", "tag2", "tag3", "verylong tag4", "extra long tag5"].map((elem, i) => (

                                <Chip iconRight
                                      key={i}
                                      title={elem}
                                      titleStyle={styles.tagTitle}
                                      containerStyle={styles.tagContainer}
                                      buttonStyle={styles.tagButton}
                                      type={"outline"}
                                      icon={{
                                          name: "close",
                                          type: "font-awesome",
                                          size: 20,
                                          color: "black",
                                      }}/>
                            ))
                        }

                    </View>
                    <Divider style={styles.dividerSmall}/>
                    <View style={styles.tagBox}>
                        {
                            ["tag long 1", "tag2", "tag3", "verylong tag4", "extra long tag5", "tag6"].map((elem, i) => (

                                <Chip iconRight
                                      key={i}
                                      title={elem}
                                      titleStyle={styles.tagTitleOff}
                                      containerStyle={styles.tagContainer}
                                      buttonStyle={styles.tagButtonOff}
                                      type={"outline"}
                                      icon={{
                                          name: "plus",
                                          type: "font-awesome",
                                          size: 20,
                                          color: "gray",
                                      }}/>
                            ))
                        }
                    </View>
                </View>
                <Button title={"Se deconnecter"} color="orange" onPress={handleLogout}/>
            </ScrollView>
            <Overlay isVisible={editingObject.isEditing} onBackdropPress={() => setEditingObject({isEditing: false})}>
                <View style={[styles.overlayView, styleUtils.columnFlex]}>
                    <Text style={{fontSize: 20}}>Enter a new {editingObject?.label?.toLowerCase()}</Text>
                    <Input placeholder={editingObject?.label}
                           secureTextEntry={editingObject?.label === "Password"}
                           // textContentType={editingObject?.label === "Password" ? "password" : editingObject?.label === "Mail" ? "emailAddress" : "name"}
                           onChangeText={(t) => setEditingObject({...editingObject, field: t})}/>
                    <Button onPress={() => editingObject.onSubmit?.(editingObject?.field)} title={"Change"}/>
                </View>
            </Overlay>
        </SafeAreaView>)
}
const styles = StyleSheet.create({
    overlayView: {
        width: 300,
        height: 200,
    },
    tagBox: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 30
    },
    tagContainer: {
        ...margin(5, 2, 5, 2),
        flexGrow: 2
    },
    tagTitle: {
        color: "black",
    },
    tagButton: {
        backgroundColor: "#9e9e9e",
        borderColor: "#9e9e9e",
    },
    tagButtonOff: {
        backgroundColor: "#d0d0d0",
        borderColor: "#d0d0d0",
    },
    tagTitleOff: {
        color: "grey",
    },
    header: {
        backgroundColor: "orange",
        height: 200,
    },
    headerTitle: {
        marginTop: 50,
        textAlign: "center",
        color: "white",
        fontSize: 50,
        fontWeight: "600"
    },
    avatar: {
        flex: 2,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 50,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    body: {
        marginTop: 100,
    },
    label: {
        marginRight: 5
    },
    field: {
        ...margin(5, 20, 5, 20),
        fontWeight: "bold"
    },
    divider: {
        ...margin(15, 20, 15, 20)
    },
    dividerSmall: {
        ...margin(0, 50, 20, 50)
    }

});
