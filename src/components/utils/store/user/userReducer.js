export const SET_USER_ACTION = "SET_USER_ACTION";
export const SET_USER_NAME_ACTION = "SET_USER_NAME_ACTION";
export const LOGIN_USER_ATTEMPT_ACTION = "LOGIN_USER_ATTEMPT_ACTION";
export const LOGOUT_USER_ACTION = "LOGOUT_USER_ACTION";
export const GET_USER_INFO_ACTION = "GET_USER_INFO_ACTION";
export const LOG_SUCCESS = "LOG_SUCCESS";

const defaultUser = {
    name: null,
    mail: null,
    role: null,
    tags: [],
    isLogged: false,
}

export default function userReducer(state = defaultUser, action) {
    switch (action.type) {
        case SET_USER_ACTION:
            return { ...state, ...action.payload.user};
        case SET_USER_NAME_ACTION:
            return { ...state, name: action.payload};
        case LOG_SUCCESS:
            return {...state, isLogged: true}
        case LOGOUT_USER_ACTION:
            return defaultUser;
        case LOGIN_USER_ATTEMPT_ACTION:
        case GET_USER_INFO_ACTION:
            return state;

        default:
            return state;

    }
}
