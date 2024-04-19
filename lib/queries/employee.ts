import api, { converToStringfy } from "../Api";
import { Employee } from "../constants";

export const getEmployees = async () => {
    try {
        const { data } = await api.get<Employee>('/employee')
        return data;
    } catch (error) {
        throw error
    }
}


export const postCreateAtm = async (email: string, name: string, phone: string) => {
    try {
        const obj = {
            email:email,
            name:name,
            phone:phone,
            branchId:1,
        }
        return await api.post('/employee/atm', converToStringfy(obj));
    } catch (error) {
        throw error
    }
}



