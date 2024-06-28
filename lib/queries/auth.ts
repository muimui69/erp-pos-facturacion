import api, { converToStringfy } from "../api";
import { PostUserSigninParams, GetSigninResponse, PostUserSingupParams, PostUserSingupResponse, GetSigninTenantResponse, PacthPasswordUserTenant } from "./interfaces/auth.interface";

export const postSigninUser = async (user: PostUserSigninParams) => {
    try {
        const obj: PostUserSigninParams = {
            email: user.email,
            password: user.password
        }
        return await api.post<GetSigninResponse>('/auth/login', converToStringfy(obj))
    } catch (err) {
        throw err;
    }
}

export const postSigninTenantUser = async (user: PostUserSigninParams, subdomain: string) => {
    try {
        const obj: PostUserSigninParams = {
            email: user.email,
            password: user.password
        }
        return await api.post<GetSigninTenantResponse>('/auth/login/service', converToStringfy(obj), {
            headers: {
                "subdomain": subdomain
            }
        })
    } catch (err) {
        throw err;
    }
}

export const postSingupUser = async (user: PostUserSingupParams) => {
    try {
        const obj: PostUserSingupParams = {
            name: user.name,
            phone: user.phone,
            email: user.email,
            password: user.password
        }
        return await api.post<PostUserSingupResponse>('/users', converToStringfy(obj))
    } catch (err) {
        throw err;
    }
}


export const patchPasswordTenantUser = async (subdomain: string, serviceToken: string, password: PacthPasswordUserTenant) => {
    try {
        const obj: PacthPasswordUserTenant = {
            password: password.password,
            password_update: password.password_update
        }
        return await api.patch<GetSigninTenantResponse>('/auth/password-update/service', converToStringfy(obj), {
            headers: {
                "subdomain": subdomain,
                "service-token": serviceToken
            }
        })
    } catch (err) {
        throw err;
    }
}
