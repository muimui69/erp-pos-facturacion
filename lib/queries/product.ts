import api, { converToStringfy } from "../api";
import { GetProductsResponse, GetProdutIdResponse, PatchProductParams } from "./interfaces/product.interface";

export const getAllProducts = async (subdomain: string, serviceToken: string) => {
    try {
        const { data } = await api.get<GetProductsResponse>('/product', {
            headers: {
                "subdomain": subdomain,
                "service-token": serviceToken
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const getProductById = async (subdomain: string, id: string) => {
    try {
        const { data } = await api.get<GetProdutIdResponse>(`/product/${parseInt(id)}`, {
            headers: {
                "subdomain": subdomain,
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const postCreateProduct = async (subdomain: string, serviceToken: string, formData: FormData) => {
    try {
        return await api.post('/product', formData, {
            headers: {
                "subdomain": subdomain,
                "service-token":serviceToken,
                "Content-Type": 'multipart/form-data',
            }
        });
    } catch (error) {
        throw error;
    }
}

export const deleteProductById = async (subdomain: string, id: string) => {
    try {
        const { data } = await api.delete(`/product/${parseInt(id)}`, {
            headers: {
                "subdomain": subdomain,
            }
        });
        return data;
    } catch (err) {
        throw err;
    }

}

export const patchProviderById = async (subdomain: string, id: string, product: PatchProductParams) => {
    try {
        const obj: PatchProductParams = {
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            photo: product.photo,
            categories: product.categories
        }
        return await api.patch(`/product/${parseInt(id)}`, converToStringfy(obj), {
            headers: {
                "subdomain": subdomain,
            }
        });
    } catch (err) {
        throw err;
    }
}
