import api, { converToStringfy } from "../Api";
import { City } from "./interfaces/city.interface";

export const getAllCity = async () => {
    try {
        const { data } = await api.get<City>('/city')
        return data
    } catch (error) {
        throw error
    }
}

export const getCityById = async (id: number) => {
    try {
        const { data } = await api.get(`/city/${id}`)
        return data
    } catch (error) {
        throw error
    }
}

export const postCreateCity = async (Nombre: string) => {
    try {
        const obj = {
            name: Nombre
        }
        return await api.post('/city', converToStringfy(obj))
    } catch (error) {
        throw error
    }

}
export const deleteCityId = async (id: number) => {
    try {
        const { data } = await api.delete(`/city/${id}`);
        return data;
    } catch (err) {
        throw err;
    }

}
export const putUpdateCity = async (nombre: string, id: string) => {
    try {
        const obj = {
            name: nombre,
            status:true
        }
        return await api.patch(`/city/${id}`, converToStringfy(obj));
    } catch (err) {
        throw err;
    }
}
