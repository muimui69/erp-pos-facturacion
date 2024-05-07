import api, { converToStringfy } from "../apisss";

export const GetAtm = async () => {
    try {
        const { data } = await api.get('/atm?skip=0&limit=20');
        return data
    } catch (error) {
        throw error
    }
}
export const getAtmId = async (id: number) => {
    try {
        const { data } = await api.get(`/atm/${id}`)
        return data
    } catch (error) {
        throw error

    }
}
export const CreateAtm = async (name: string, branchId: number) => {
    try {
        const obj = {
            name,
            branchId
        }
        return await api.post('/atm', converToStringfy(obj))
    } catch (error) {

    }

}

export const deleteAtmId = async (id: number) => {
    try {
        const { data } = await api.delete(`/atm/${id}`);
        return data;
    } catch (err) {
        throw err;
    }
}
export const putUpdateAtm = async (nombre: string, id: string) => {
    try {
        const obj = {
            name: nombre
        }
        return await api.put(`/atm/${id}`, converToStringfy(obj));
    } catch (err) {
        throw err;
    }
}