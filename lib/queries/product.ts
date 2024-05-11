import api, { converToStringfy } from "../api";
import { PostProduct, Product } from "./interfaces/product.interface";

export const getAllProducts = async () => {
    try {
        const { data } = await api.get<Product>('/product')
        return data
    } catch (error) {
        throw error
    }
}

// export const getCityById = async (id: number) => {
//     try {
//         const { data } = await api.get(`/city/${id}`)
//         return data
//     } catch (error) {
//         throw error
//     }
// }

export const postCreateProduct = async (subdomain: string, formData: FormData) => {
    try {
        return await api.post('/product', formData, {
            headers: {
                "subdomain": subdomain,
                'Content-Type': 'multipart/form-data',
            }
        })
    } catch (error) {
        throw error
    }
}

// export const deleteCityId = async (id: number) => {
//     try {
//         const { data } = await api.delete(`/city/${id}`);
//         return data;
//     } catch (err) {
//         throw err;
//     }

// }
// export const putUpdateCity = async (nombre: string, id: string) => {
//     try {
//         const obj = {
//             name: nombre,
//             status: true
//         }
//         return await api.patch(`/city/${id}`, converToStringfy(obj));
//     } catch (err) {
//         throw err;
//     }
// }