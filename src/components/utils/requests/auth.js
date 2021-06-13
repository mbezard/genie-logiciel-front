import axios from "axios";
import {ADD_TAG_TO_USER_URL, ADD_USER_VISITED_PLACE, GET_USER_VISITED_PLACES, REMOVE_TAG_FROM_USER_URL, SIGNIN_URL, UPDATE_USER_URL} from "../Url";

export const attemptSignin = async (name, password, mail ) => {
    const data = new FormData();
    data.append("name", name);
    data.append("password", password);
    data.append("mail", mail);
    let error = false;
    const response = (await axios.post(SIGNIN_URL, data).catch(reason => error = reason.response));
    return {data: response.data, error: error}
}

export const modifyUser = async ({name, mail, password, tags}) => {
    const data = new FormData();
    if(name) data.append("name", name);
    if (mail) data.append("mail", mail);
    if (password) data.append("password", password);
    if (tags) data.append("tagsAsString", JSON.stringify(tags));
    return (await axios.post(UPDATE_USER_URL, data)).data;
}

export const addTagToUser = async (tagId) => {
    return (await axios.put(ADD_TAG_TO_USER_URL + "/" + tagId)).data;
}

export const removeTagFromUser = async (tagId) => {
    return (await axios.delete(REMOVE_TAG_FROM_USER_URL + "/" + tagId)).data;
}

export const addVisitedPlace = async (placeId) => {
    return (await axios.post(ADD_USER_VISITED_PLACE + "/" + placeId)).data;
}

export const getVisitedPlaces = async () => {
    return (await axios.get(GET_USER_VISITED_PLACES)).data;
}