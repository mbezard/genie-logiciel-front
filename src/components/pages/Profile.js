import React, {useCallback, useEffect, useState} from "react";
import {Text, View, Button, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {getUserInfos, logout} from "../utils/store/user/userActions";
import styleUtils, {margin, padding} from "../utils/styleUtils";
import {Avatar, Chip, Divider, Icon, Input, Overlay} from "react-native-elements";
import {addTagToUser, modifyUser, removeTagFromUser} from "../utils/requests/auth";
import {getAllTags} from "../utils/requests/tags";

export default function Profile({navigation}) {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [allTags, setAllTags] = useState([]);
    useEffect(() => {
        getAllTags().then(value => setAllTags(value))
    }, [])
    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigation.navigate("Home")
    }, [dispatch]);
    const updateUserInfos = useCallback(() => {
        dispatch(getUserInfos());
    }, [dispatch])
    const [editingField, setEditingField] = useState();
    const [error, setError] = useState();
    const [newUser, setNewUser] = useState({});
    // console.log(editingField)
    // console.log(newUser)

    const handleChangeClick = () => {
        if (newUser.mail) {
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!reg.test(newUser.mail.toLowerCase())) {
                setError("Wrong format mail")
                return;
            }
        }
        modifyUser({
            name: newUser.name,
            mail: newUser.mail,
            password: newUser.password,
            tags: newUser.tags
        }).then(() => {
            setError(undefined)
            setEditingField(undefined)
            setNewUser({})
            updateUserInfos();
        }).catch(() => setError("Identifiant already used"))
    }

    const handleChangeText = (value) => {
        setNewUser({[editingField?.toLowerCase()]: value})
    }

    function handleNewTagClick(id) {
        addTagToUser(id).then(() => {
            updateUserInfos();
        })
    }

    function handleRemoveTagClick(id) {
        removeTagFromUser(id).then(() => {
            updateUserInfos();
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
                              onPress={() => setEditingField("Name")}/>
                    </View>

                    <View style={styleUtils.inlineFlex}>
                        <Text style={styles.label}>Your mail : </Text>
                        <Text style={styles.field}>{user?.mail}</Text>
                        <Icon reverse raised name={"edit"} type={"font-awesome"} color={"orange"} size={15}
                              onPress={() => setEditingField("Mail")}/>
                    </View>

                    <View style={styleUtils.inlineFlex}>
                        <Text style={styles.label}>Your password : </Text>
                        <Text style={styles.field}>***</Text>
                        <Icon reverse raised name={"edit"} type={"font-awesome"} color={"orange"} size={15}
                              onPress={() => setEditingField("Password")}/>
                    </View>

                    <Divider style={styles.divider}/>

                    <View style={styleUtils.inlineFlex}>
                        <Text style={styles.label}>Your favorite tags : </Text>
                        <Icon reverse raised name={"edit"} type={"font-awesome"} color={"orange"} size={15}
                              onPress={() => setEditingField(prevState => (prevState !== "Tags" ? "Tags" : undefined))}/>
                    </View>
                    <View style={styles.tagBox}>
                        {
                            user.tags?.length > 0 ?

                                user.tags?.map((elem, i) => (

                                    <Chip iconRight
                                          key={i}
                                          title={elem.title}
                                          titleStyle={styles.tagTitle}
                                          containerStyle={styles.tagContainer}
                                          buttonStyle={styles.tagButton}
                                          type={"outline"}
                                          onPress={() => handleRemoveTagClick(elem.id)}
                                          icon={{
                                              name: "close",
                                              type: "font-awesome",
                                              size: 20,
                                              color: "black",
                                          }}/>
                                ))
                                :
                                <View style={styleUtils.containerCenter}>
                                    <Text style={{color: "gray"}}>No favorites tags</Text>
                                </View>
                        }

                    </View>
                    {
                        editingField === "Tags" && <>
                            <Divider style={styles.dividerSmall}/>
                            <View style={styles.tagBox}>
                                {
                                    allTags.map((elem, i) => (

                                        <Chip iconRight
                                              key={i}
                                              title={elem.title}
                                              titleStyle={styles.tagTitleOff}
                                              containerStyle={styles.tagContainer}
                                              buttonStyle={styles.tagButtonOff}
                                              onPress={() => handleNewTagClick(elem.id)}
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

                        </>
                    }
                </View>
                <Button title={"Se deconnecter"} color="orange" onPress={handleLogout}/>
            </ScrollView>
            <Overlay isVisible={editingField !== undefined && editingField !== "Tags"} onBackdropPress={() => {
                setEditingField(undefined);
                setNewUser({});
                setError(undefined)
            }}>
                <View style={[styles.overlayView, styleUtils.columnFlex]}>
                    <Text style={{fontSize: 20}}>Enter a new {editingField?.toLowerCase()}</Text>
                    <Input placeholder={editingField}
                           secureTextEntry={editingField === "Password"}
                        // textContentType={editingObject?.label === "Password" ? "password" : editingObject?.label === "Mail" ? "emailAddress" : "name"}
                           onChangeText={handleChangeText}/>
                    {error && <Text style={styles.alert}>{error}</Text>}
                    <Button onPress={handleChangeClick} title={"Change"}/>
                </View>
            </Overlay>
        </SafeAreaView>
    )
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
    },
    alert: {
        ...padding(0, 20, 0, 20),
        ...margin(10, 5, 5, 5),
        color: "red",
        backgroundColor: "rgba(255,165,165,0.35)"
    }

});
