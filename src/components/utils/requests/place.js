import axios from "axios";
import {GET_PLACES_FROM_TAGS_URL} from "../Url";

export const getPlacesFromTags = async (tags, latitude = null, longitude = null) => {
    const data = new FormData();
    data.append("tagsAsString", JSON.stringify(tags))
    if(latitude != null) data.append("latitude", latitude);
    if(longitude != null) data.append("longitude", longitude);
    return (await axios.post(GET_PLACES_FROM_TAGS_URL, data)).data;
}
