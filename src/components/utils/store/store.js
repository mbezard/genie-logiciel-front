import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import userReducer from "./user/userReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfos} from "./user/userActions";

const store = createStore(combineReducers({
    user: userReducer,
}),undefined,
    applyMiddleware(thunk)
);

AsyncStorage.getItem("authJwtToken").then(data => {
    console.log("test storage", data)
    if(data) {
        const token = JSON.parse(data).token;
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserInfos(token))
    }
})
// if (AsyncStorage.getItem("authJwtToken")) {
//     axios.defaults.headers.common['Authorization'] = `${localStorage.authJwtToken}`;
//     store.dispatch(getUserInfos(localStorage.authJwtToken))
// } else {
//     delete axios.defaults.headers.common['Authorization'];
// }



export default store;
