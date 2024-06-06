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




// import api, { converToStringfy } from "../api";

// export const GetAtm = async () => {
//     try {
//         const { data } = await api.get('/atm?skip=0&limit=20');
//         return data
//     } catch (error) {
//         throw error
//     }
// }
// export const getAtmId = async (id: number) => {
//     try {
//         const { data } = await api.get(`/atm/${id}`)
//         return data
//     } catch (error) {
//         throw error

//     }
// }
// export const CreateAtm = async (name: string, branchId: number) => {
//     try {
//         const obj = {
//             name,
//             branchId
//         }
//         return await api.post('/atm', converToStringfy(obj))
//     } catch (error) {

//     }

// }

// export const deleteAtmId = async (id: number) => {
//     try {
//         const { data } = await api.delete(`/atm/${id}`);
//         return data;
//     } catch (err) {
//         throw err;
//     }
// }
// export const putUpdateAtm = async (nombre: string, id: string) => {
//     try {
//         const obj = {
//             name: nombre
//         }
//         return await api.put(`/atm/${id}`, converToStringfy(obj));
//     } catch (err) {
//         throw err;
//     }
// }