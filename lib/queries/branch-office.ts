import api, { converToStringfy } from "../api";
import { GetBranchIdResponse, GetBranchsResponse, PatchBranchParams, PostBranchParams } from "./interfaces/branch.interface";


export const getAllBranchs = async (serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetBranchsResponse>('/branch', {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        })
    } catch (error) {
        throw error
    }
}

export const getBranchById = async (id: number, serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetBranchIdResponse>(`/branch/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        })
    } catch (error) {
        throw error
    }
}

export const postCreateBranch = async (subdomain: string, serviceToken: string, branch: PostBranchParams) => {
    try {
        const obj = {
            address: branch.address,
            name: branch.name,
            lng: branch.lng,
            lat: branch.lat,
            cityId: branch.cityId
        }
        return await api.post('/branch', converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        })
    } catch (error) {
        throw error
    }

}

export const deleteBranchId = async (subdomain: string, serviceToken: string, id: string) => {
    try {
        const { data } = await api.delete(`/branch/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
        return data;
    } catch (err) {
        throw err;
    }

}

export const patchBranchById = async (subdomain: string, serviceToken: string, id: string, branch: PatchBranchParams) => {
    try {
        const obj = {
            address: branch.address,
            name: branch.name,
            lng: branch.lng,
            lat: branch.lat,
            cityId: branch.cityId
        }
        return await api.patch(`/branch/${id}`, converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
    } catch (error) {
        throw error
    }
};