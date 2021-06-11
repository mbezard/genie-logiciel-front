import axios from "axios";
import {SIGNIN_URL, UPDATE_USER_URL} from "../Url";

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
