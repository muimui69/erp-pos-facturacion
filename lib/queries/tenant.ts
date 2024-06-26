import api, { converToStringfy } from "../api";
import { GetTenantsUserResponse } from "./interfaces/tenant.interface";

export const getAllTenantsUser = async (token: string) => {
    try {
        const { data } = await api.get<GetTenantsUserResponse>('/tenant/user', {
            headers: {
                "auth-token": token
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

