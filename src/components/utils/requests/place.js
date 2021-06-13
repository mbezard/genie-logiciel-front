import axios from "axios";
import {ADD_PLACE_URL, GET_PLACES_FROM_TAGS_URL} from "../Url";

export const getPlacesFromTags = async (tags, latitude = null, longitude = null) => {
    const data = new FormData();
    data.append("tagsAsString", JSON.stringify(tags))
    if(latitude != null) data.append("latitude", latitude);
    if(longitude != null) data.append("longitude", longitude);
    return (await axios.post(GET_PLACES_FROM_TAGS_URL, data)).data;
}

export const addNewPlace = async (nom, adresse, inputTags ) => {
    const data = new FormData();
    data.append("nom", nom);
    data.append("adresse", adresse);
    data.append("inputTags", inputTags);
    let error = false;
    const response = (await axios.post(ADD_PLACE_URL, data).catch(reason => error = reason.response));
    return {data: response.data, error: error}
}
