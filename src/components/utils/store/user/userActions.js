import {
    GET_USER_INFO_ACTION,
    LOG_SUCCESS,
    LOGIN_USER_ATTEMPT_ACTION,
    LOGOUT_USER_ACTION,
    SET_USER_ACTION
} from "./userReducer";
import axios from "axios";
import {GET_USER_INFO_URL, LOGIN_URL} from "../../Url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUser = (user) => ({
    type: SET_USER_ACTION,
    payload: {user}
});

export const loginAttempt = (username, password) => {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    console.log("data", data)
    return dispatch => {
        console.log('inside dispatch')
        dispatch({
            type: LOGIN_USER_ATTEMPT_ACTION
        });

        axios.post(LOGIN_URL, data).then(
            response => {
                const token = response.data.token;
                axios.defaults.headers.common['Authorization'] = `${token}`;
                AsyncStorage.setItem('authJwtToken', token);
                dispatch(getUserInfos());
            }
        ).catch(reason => console.log("error while loging in", reason))
    }
}

export const logout = () => {
    AsyncStorage.removeItem('authJwtToken')
    return {
        type: LOGOUT_USER_ACTION
    };
}

export const logSuccess = () => ({
    type: LOG_SUCCESS
});


export const getUserInfos = () => {

    return dispatch => {
        dispatch({
            type: GET_USER_INFO_ACTION
        });
        axios.get(GET_USER_INFO_URL).then(
            response => {
                const user = response.data;
                dispatch(logSuccess());
                dispatch(setUser({...user}));
            }
        )
    }
}
