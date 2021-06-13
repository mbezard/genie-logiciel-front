import axios from "axios";
import {ADD_PLACE_URL} from "../Url";

export const addNewPlace = async (nom, adresse, inputTags ) => {
    const data = new FormData();
    data.append("nom", nom);
    data.append("adresse", adresse);
    data.append("inputTags", inputTags);
    let error = false;
    const response = (await axios.post(ADD_PLACE_URL, data).catch(reason => error = reason.response));
    return {data: response.data, error: error}
}