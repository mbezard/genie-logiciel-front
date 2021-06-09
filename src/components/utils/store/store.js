import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(combineReducers({
    user: userReducer,
}),undefined,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);




export default store;
