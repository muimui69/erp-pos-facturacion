import api, { converToStringfy } from "../api";
import { PostUser, Signin } from "./interfaces/auth.interface";

export const postSigninUser = async (user: PostUser) => {
    try {
        const obj: PostUser = {
            email: user.email,
            password: user.password
        }
        return await api.post<Signin>('/auth/login', converToStringfy(obj))
    } catch (err) {
        throw err;
    }
}

