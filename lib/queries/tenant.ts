import api, { converToStringfy } from "../api";
import { GetTenantsResponse } from "./interfaces/tenant.interface";

export const getAllTenantsUser = async (token:string) => {
    try {
        const { data } = await api.get<GetTenantsResponse>('/tenant/user',{
            headers: {
                "auth-token": token
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

