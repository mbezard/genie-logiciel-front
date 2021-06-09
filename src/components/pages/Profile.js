import React, {useCallback} from "react";
import {Text, View, Button} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../utils/store/user/userSelector";
import {logout} from "../utils/store/user/userActions";
import styleUtils from "../utils/styleUtils";

export default function Profile({navigation}) {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigation.navigate("Home")
    }, [dispatch])


    return (<View style={styleUtils.containerCenter}>
        <Text>Page de profile</Text>
        <Text>{JSON.stringify(user)}</Text>
        <Button title={"Se deconnecter"} color="orange" onPress={handleLogout}/>
    </View>)
}
