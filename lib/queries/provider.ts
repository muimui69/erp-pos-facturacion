import api, { converToStringfy } from "../api";
import { GetProviderIdResponse, GetProvidersResponse, PatchProviderParams, PostProviderParams } from "./interfaces/provider.intreface";

export const getAllProviders = async (subdomain: string) => {
    try {
        return await api.get<GetProvidersResponse>('/provider', {
            headers: {
                subdomain
            }
        });
    } catch (error) {
        throw error;
    }
}


export const getProviderById = async (subdomain: string, id: string) => {
    try {
        const { data } = await api.get<GetProviderIdResponse>(`/provider/${id}`, {
            headers: {
                subdomain
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const postCreateProvider = async (subdomain: string, provider: PostProviderParams) => {
    try {
        const obj: PostProviderParams = {
            name: provider.name,
            email: provider.email,
            phone: provider.phone
        }
        return await api.post('/provider', converToStringfy(obj), {
            headers: {
                subdomain
            }
        });
    } catch (error) {
        throw error;
    }
}


export const deleteProviderById = async (subdomain: string, id: string) => {
    try {
        const { data } = await api.delete(`/provider/${id}`, {
            headers: {
                subdomain
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const patchProviderById = async (subdomain: string, id: string, provider: PatchProviderParams) => {
    try {
        const obj: PatchProviderParams = {
            name: provider.name,
            email: provider.email,
            phone: provider.phone
        }
        const { data } = await api.patch(`/provider/${id}`, converToStringfy(obj), {
            headers: {
                subdomain
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}
