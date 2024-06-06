import api, { converToStringfy } from "../api";
import { GetCitiesResponse, GetCityByID } from "./interfaces/city.interface";

export const getAllCities = async (serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetCitiesResponse>('/city', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}


export const getCityById = async (serviceToken: string, subdomain: string, id: string) => {
    try {
        return await api.get<GetCityByID>(`/city/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}

export const postCreateCity = async (serviceToken: string, subdomain: string, nombre: string) => {
    try {
        const obj = {
            name: nombre
        }
        return await api.post('/city', converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        })
    } catch (error) {
        throw error
    }
}

export const deleteCityById = async (serviceToken: string, subdomain: string, id: string) => {
    try {
        const { data } = await api.delete(`/city/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
        return data;
    } catch (err) {
        throw err;
    }
}


export const patchCityById = async (serviceToken: string, subdomain: string, nombre: string, id: string) => {
    try {
        const obj = {
            name: nombre,
            status: true
        }
        return await api.patch(`/city/${id}`, converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (err) {
        throw err;
    }
}
