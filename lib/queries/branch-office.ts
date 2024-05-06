import api, { converToStringfy } from "../api";
import { Branch, BranchUpdateData } from "./interfaces/branch.interface";


export const getAllBranchs = async () => {
    try {
        const { data } = await api.get<Branch>('/branch')
        return data;
    } catch (error) {
        throw error
    }
}

export const getBranchsId = async (id: number) => {
    try {
        const { data } = await api.get(`/branch/${id}`)
        return data
    } catch (error) {
        throw error

    }
}

export const postCreateBranch = async ({ address, name, lat, lng, cityId }: { address: string, name: string, lat: number, lng: number, cityId: string }) => {
    try {
        const obj = {
            address,
            name,
            lng,
            lat,
            cityId: parseInt(cityId)
        }
        return await api.post('/branch', converToStringfy(obj))

    } catch (error) {
        throw error
    }

}

export const deleteBranchId = async (id: number) => {
    try {
        const { data } = await api.delete(`/branch/${id}`);
        return data;
    } catch (err) {
        throw err;
    }

}

export const patchBranchOffice = async (id: string, updatedData: BranchUpdateData) => {
    try {
        return await api.patch(`/branch/${parseInt(id)}`, updatedData);
    } catch (error) {
        throw error
    }
};