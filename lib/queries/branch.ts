import api, { converToStringfy } from "../Api";
import { Branch } from "../constants";

export const getBrands = async () => {
    try {
        const { data } = await api.get('/products/brand');
        return data;
    } catch (err) {
        throw err;
    }
}

export const getBrandsQuery = async () => {
    try {
        const { data } = await api.get('/api/products/brand');
        return data;
    } catch (err) {
        throw err;
    }
}


export const getBrandsName = async (name: string) => {
    try {
        const { data } = await api.get(`/products/brand/${name}`);
        return data;
    } catch (err) {
        throw err;
    }
}

export const deleteBrandById = async (id: number) => {
    try {
        const { data } = await api.delete(`/api/products/brand/crud/${id}`);
        return data;
    } catch (err) {
        throw err;
    }
}


export const postCreateBrandQuery = async (name: string) => {
    try {
        const obj = {
            nombre: name,
        }
        return await api.post('/api/products/brand', converToStringfy<Branch>(obj));
    } catch (err) {
        throw err;
    }
}

export const getBrandById = async (id: number) => {
    try {
        const { data } = await api.get(`/products/brand/crud/${id}`);
        return data;
    } catch (err) {
        throw err;
    }
}

export const putUpdateBrand = async (name: string, id: string) => {
    try {
        const obj = {
            nombre: name,
        }
        return await api.put(`/api/products/brand/crud/${id}`, converToStringfy(obj));
    } catch (err) {
        throw err;
    }
}

