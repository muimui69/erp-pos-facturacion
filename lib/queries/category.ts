import api, { converToStringfy } from "../api";
import { GetCategoryIdResponse, GetCategoriesResponse, PatchCategoryParams, PostCategoryParams } from "./interfaces/category.interface";

export const getAllCategories = async(serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetCategoriesResponse>('/category', {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
    } catch (error) {
        throw error;
    }
}

export const getAllCategoriesProd = async(serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetCategoriesResponse>('/product/category', {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
    } catch (error) {
        throw error;
    }
}


export const getCategoryById = async (subdomain: string, id: number) => {
    try {
        const { data } = await api.get<GetCategoryIdResponse>(`/category/${id}`, {
            headers: {
                subdomain
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const postCreateCategory = async (subdomain: string, serviceToken: string, category: PostCategoryParams) => {
    try {
        const obj: PostCategoryParams = {
            description: category.description
        }
        return await api.post('/category', converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
    } catch (error) {
        throw error;
    }
}


export const deleteCategoryById = async (subdomain: string, serviceToken: string, id: string) => {
    try {
        const { data } = await api.delete(`/category/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const patchCategoryById = async (subdomain: string, id: string, category: PatchCategoryParams) => {
    try {
        const obj: PatchCategoryParams = {
            description: category.description
        }
        const { data } = await api.patch(`/category/${id}`, converToStringfy(obj), {
            headers: {
                subdomain
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}
