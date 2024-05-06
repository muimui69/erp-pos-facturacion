import api, { converToStringfy } from "../api";
import { Employee } from "./interfaces/employee.interface";

export const getEmployees = async () => {
    try {
        const { data } = await api.get<Employee>('/employee')
        return data;
    } catch (error) {
        throw error;
    }
}


export const postCreateAtm = async (email: string, name: string, phone: string, branchId: string) => {
    try {
        const obj = {
            email: email,
            name: name,
            phone: phone,
            branchId: parseInt(branchId),
        }
        return await api.post('/employee/atm', converToStringfy(obj));
    } catch (error) {
        throw error
    }
}



