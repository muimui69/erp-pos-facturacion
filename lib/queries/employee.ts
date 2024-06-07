import api, { converToStringfy } from "../api";
import { GetEmployeeByID, GetEmployeesResponse } from "./interfaces/employee.interface";

export const getAllEmployees = async (serviceToken: string, subdomain: string) => {
    try {
        return await api.get<GetEmployeesResponse>('/user-role', {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}
    

export const getEmployeeById = async (serviceToken: string, subdomain: string, id: string) => {
    try {
        return await api.get<GetEmployeeByID>(`/user-role/${id}`, {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        });
    } catch (error) {
        throw error;
    }
}


// export const postCreateRole = async (serviceToken: string, subdomain: string, role: PostRoleParams) => {
//     try {
//         const obj: PostRoleParams = {
//             desc: role.desc,
//             permissions: role.permissions
//         }
//         return await api.post('/role', converToStringfy(obj), {
//             headers: {
//                 subdomain,
//                 "service-token": serviceToken
//             }
//         });
//     } catch (error) {
//         throw error;
//     }
// }


// export const deleteRoleById = async (serviceToken: string, subdomain: string, id: string) => {
//     try {
//         const { data } = await api.delete(`/role/${id}`, {
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


export const patchEmployeeById = async  (serviceToken: string, subdomain: string, id: string,rolId:string) => {
    try {
        const obj: any = {
            rolId: rolId
        }
        const { data } = await api.patch(`/user-role/${id}`, converToStringfy(obj), {
            headers: {
                subdomain,
                "service-token": serviceToken
            },
        })
        return data;
    } catch (error) {
        throw error;
    }
}

