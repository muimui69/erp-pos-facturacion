import api, { converToStringfy } from "../api";
import { GetBuysResponse, GetProductForBuys, PostBuyParams, RangeDate } from './interfaces/buys';

export const getAllBuys = async (serviceToken: string, subdomain: string, rangeDate: RangeDate) => {
    try {
        return await api.get<GetBuysResponse>('/buy', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
            params: {
                startDate: rangeDate.from,
                endDate: rangeDate.to
            }
        });
    } catch (error) {
        throw error;
    }
}


export const getProductForBuysById = async (serviceToken: string, subdomain: string, id: string, branchId: string) => {
    try {
        const { data } = await api.get<GetProductForBuys>(`/buy/product/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
            params: {
                branchId
            }
        })
        return data;
    } catch (error) {
        throw error;
    }
}


export const postCreateBuy = async (subdomain: string, serviceToken: string, buy: PostBuyParams) => {
    try {
        const obj: PostBuyParams = {
            providerId: buy.providerId,
            branchId: buy.branchId,
            products: buy.products
        }
        return await api.post('/buy', converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
    } catch (error) {
        throw error;
    }
}


// export const deleteCategoryById = async (subdomain: string, serviceToken: string, id: string) => {
//     try {
//         const { data } = await api.delete(`/category/${id}`, {
//             headers: {
//                 subdomain,
//                 "service-token": serviceToken
//             }
//         })
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }


// export const patchCategoryById = async (subdomain: string, id: string, category: PatchCategoryParams) => {
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
