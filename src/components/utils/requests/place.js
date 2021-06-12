import axios from "axios";
import {GET_PLACES_FROM_TAGS_URL} from "../Url";

export const getPlacesFromTags = async (tags) => {
    const data = new FormData();
    data.append("tagsAsString", JSON.stringify(tags))
    return (await axios.post(GET_PLACES_FROM_TAGS_URL, data)).data;
}
