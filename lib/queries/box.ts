import api, { converToStringfy } from "../api";
import { GetATMID, GetAtmsBoxResponse, PostAtmParams } from "./interfaces/box.interface";

export const getAllAtms = async (serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetAtmsBoxResponse>('/atm', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}


export const getAtmId = async (serviceToken: string, subdomain: string, id: string) => {
    try {
        return await api.get<GetATMID>(`/atm/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}


export const postCreateAtm = async (serviceToken: string, subdomain: string, atm: PostAtmParams) => {
    try {
        const obj: PostAtmParams = {
            name: atm.name,
            branchId: atm.branchId
        }
        return await api.post('/atm', converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}


export const deleteAtmById = async (subdomain: string, serviceToken: string, id: string) => {
    try {
        const { data } = await api.delete(`/atm/${id}`, {
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


// export const patchAtmById = async (subdomain: string, id: string, category: PatchCategoryParams) => {
//     try {
//         const obj: PatchCategoryParams = {
//             description: category.description
//         }
//         const { data } = await api.patch(`/category/${id}`, converToStringfy(obj), {
//             headers: {
//                 subdomain
//             }
//         })
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }