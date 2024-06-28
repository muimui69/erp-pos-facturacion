import api, { converToStringfy } from "../api";
import { BranchIdsPayload, GetBranchInNotProductReponse, GetBranchsInProduct, GetProductIDResponse, GetProductsResponse, PatchProductParams } from "./interfaces/product.interface";

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

export const getProductById = async (subdomain: string, serviceToken: string, id: string) => {
    try {
        const { data } = await api.get<GetProductIDResponse>(`/product/${parseInt(id)}`, {
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

export const getBranchsInProduct = async (subdomain: string, serviceToken: string, id: string) => {
    try {
        const { data } = await api.get<GetBranchsInProduct>(`/branch/product/${id}/view`, {
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

export const getBranchsInNotProduct = async (subdomain: string, serviceToken: string, id: string) => {
    try {
        const { data } = await api.get(`/branch/product/${id}`, {
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



export const postCreateBranchProduct = async (subdomain: string, serviceToken: string, branchIds: BranchIdsPayload, id: string) => {
    try {
        const obj: BranchIdsPayload = {
            branchIds: branchIds.branchIds
        }
        return await api.post(`/branch/product/${id}`, converToStringfy(obj), {
            headers: {
                "subdomain": subdomain,
                "service-token": serviceToken,
            }
        });
    } catch (error) {
        throw error;
    }
}

export const postCreateProduct = async (subdomain: string, serviceToken: string, formData: FormData) => {
    try {
        return await api.post('/product', formData, {
            headers: {
                "subdomain": subdomain,
                "service-token": serviceToken,
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

export const patchProductById = async (subdomain: string, serviceToken: string, formData: FormData, id: string) => {
    try {
        return await api.patch(`/product/${parseInt(id)}`, formData, {
            headers: {
                "subdomain": subdomain,
                "service-token": serviceToken,
                "Content-Type": 'multipart/form-data',
            }
        });
    } catch (err) {
        throw err;
    }
}

