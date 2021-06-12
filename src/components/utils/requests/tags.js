import axios from "axios";
import {GET_ALL_TAGS_URL} from "../Url";

export const getAllTags = async () => {
    return (await axios.get(GET_ALL_TAGS_URL)).data;
}
