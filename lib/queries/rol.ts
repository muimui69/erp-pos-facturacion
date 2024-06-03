import api, { converToStringfy } from "../api";
import { GelRolesResponse, GetPermissionsResponse, PostRoleParams } from "./interfaces/rol.interface";

export const getAllPermissions = async (serviceToken: string, subdomain: string, search: string) => {
    try {
        return await api.get<GetPermissionsResponse>('/role/permission', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
            params: {
                search
            }
        });
    } catch (error) {
        throw error;
    }
}

export const getAllRoles = async (serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GelRolesResponse>('/role', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}



// export const getCategoryById = async (subdomain: string, id: number) => {
//     try {
//         const { data } = await api.get<GetCategoryIdResponse>(`/category/${id}`, {
//             headers: {
//                 subdomain
//             }
//         })
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }


export const postCreateRole = async (serviceToken: string, subdomain: string, role: PostRoleParams) => {
    try {
        const obj: PostRoleParams = {
            desc: role.desc,
            permissions: role.permissions
        }
        return await api.post('/role', converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            }
        });
    } catch (error) {
        throw error;
    }
}


export const deleteRoleById = async (serviceToken: string, subdomain: string, id: string) => {
    try {
        const { data } = await api.delete(`/role/${id}`, {
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
