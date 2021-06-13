import React, {useCallback, useEffect, useState} from "react";
import {Text, View, Button, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {getUserInfos, logout} from "../utils/store/user/userActions";
import styleUtils, {margin, padding} from "../utils/styleUtils";
import {Avatar, Chip, Divider, Icon, Input, Overlay} from "react-native-elements";
import {addTagToUser, getVisitedPlaces, modifyUser, removeTagFromUser} from "../utils/requests/auth";
import {getAllTags} from "../utils/requests/tags";
import axios from "axios";

const mockPlaces = [
    {id: 1, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 2, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 3, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 4, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 5, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 6, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
    {id: 7, title: "Arc de Triomphe",address: "Place Charles-de-Gaulle Paris", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg/420px-Arc_de_Triomphe%2C_Paris_21_October_2010.jpg"},
]

export default function Profile({navigation}) {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [allTags, setAllTags] = useState([]);
    const [visitedPlaces, setVisitedPlace] = useState(mockPlaces);

    useEffect(() => {
        getAllTags().then(value => setAllTags(value));
        getVisitedPlaces().then(value => {
            return setVisitedPlace(value)
        });
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
        }).then((data) => {
            if(data && data.startsWith("Bearer")) {
                axios.defaults.headers.common['Authorization'] = data
            }
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
                    <Text style={styles.headerTitle}>Your profile</Text>
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
                                          onPress={editingField === "Tags" ? () => handleRemoveTagClick(elem.id) : undefined}
                                          icon={editingField === "Tags" ? {
                                              name: "close",
                                              type: "font-awesome",
                                              size: 20,
                                              color: "black",
                                          } : undefined}/>
                                ))
                                :
                                <View style={styleUtils.containerCenter}>
                                    <Text style={{color: "gray"}}>No favorite tags</Text>
                                </View>
                        }

                    </View>
                    {
                        editingField === "Tags" && <>
                            <Divider style={styles.dividerSmall}/>
                            <View style={styles.tagBox}>
                                {
                                    allTags.filter(tag => !user.tags.some(userTag => userTag.id === tag.id)).map((elem, i) => (

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
                    
                    {   (visitedPlaces.length!== 0) ?(
                        <View>
                            <Divider style={styles.divider}/>
                            <View>
                                <Text style={styles.visitedPlacesLabel}>Your last visited places : </Text>
                            </View>
                    
                            <View style={styles.placesHistoryBox}>
                            
                            {
                                visitedPlaces.map(place => (
                                <TouchableOpacity
                                    key={place.id}
                                    style={styles.placeContainer}
                                    activeOpacity={0.5}
                                    onPress={() => console.log("Rediriger vers place_detail ayant pour id " + place.id)}
                                >
                                    <Text style={styles.placeTitle}>{place.title}</Text>
                                </TouchableOpacity>))
                            }
                            </View>
                        </View>)
                        : <></>
                    }
                    
                    
                </View>
                <Button title={"Logout"} color="orange" onPress={handleLogout}/>
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
    },
    visitedPlacesLabel:{
        textAlign:"center",
    },
    placesHistoryBox:{
        width:"100%",
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-around",
        alignItems:"center",
        marginBottom:20,
    },
    placeContainer:{
        ...padding(10,5),
        ...margin(10, 0),
        width:"40%",
        borderWidth: 2,
        borderColor: "grey",
        borderRadius: 8,
        backgroundColor:"#E3E3E3",
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 5,
    }, 
    placeTitle:{
        color:"#444444",
        textAlign:"center",
        fontSize:17,
    }

});
