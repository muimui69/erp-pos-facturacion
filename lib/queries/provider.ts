import api, { converToStringfy } from "../api";
import { GetProviderUuid, PatchProviderParams, PostProviderParams, Provider } from "./interfaces/provider.intreface";

export const getAllProviders = async (subdomain: string) => {
    try {
        return await api.get<Provider>('/provider', {
            headers: {
                subdomain
            }
        });
    } catch (error) {
        throw error;
    }
}


export const getProviderByUuid = async (subdomain: string, uuid: string) => {
    try {
        const { data } = await api.get<GetProviderUuid>(`/provider/${uuid}`, {
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


export const deleteProviderByUuid = async (subdomain: string, uuid: string) => {
    try {
        const { data } = await api.delete(`/provider/${uuid}`, {
            headers: {
                subdomain
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const patchProviderByUuid = async (subdomain: string, uuid: string, provider: PatchProviderParams) => {
    try {
        const obj: PatchProviderParams = {
            name: provider.name,
            email: provider.email,
            phone: provider.phone
        }
        const { data } = await api.patch(`/provider/${uuid}`, converToStringfy(obj), {
            headers: {
                subdomain
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}
