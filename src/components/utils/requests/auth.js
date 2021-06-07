import axios from "axios";
import {SIGNIN_URL} from "../Url";

export const attemptSignin = async (name, password, mail ) => {
    const data = new FormData();
    data.append("name", name);
    data.append("password", password);
    data.append("mail", mail);
    let error = false;
    const response = (await axios.post(SIGNIN_URL, data).catch(reason => error = reason.response));
    console.log(response)
    return {data: response.data, error: error}
}
