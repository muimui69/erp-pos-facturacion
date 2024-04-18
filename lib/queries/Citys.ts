import apis,{converToStringfy} from "../Api";

export const GetCity=async ()=>{
    try {
        const {data}=await apis.get('/city')
        return data
    } catch (error) {
        throw error
    }
}

export const GetCityById=async (id:number)=>{
    try {
        const {data}=await apis.get(`/city/${id}`)
        return data
    } catch (error) {
        throw error
    }
}

export const PostCreateCity=async (Nombre:string)=>{
    try {
        const obj={
            name:Nombre
        }
        return await apis.post('/city',converToStringfy(obj))
    } catch (error) {
        throw error
    }

}
export const DeleteCityId= async(id:number)=>{
    try {
        const { data } = await apis.delete(`/city/${id}`);
        return data;
    } catch (err) {
        throw err;
    }

}
export const putUpdateCity = async (nombre: string, id: string) => {
    try {
        const obj = {
            name:nombre
        }
        return await apis.put(`/city/${id}`, converToStringfy(obj));
    } catch (err) {
        throw err;
    }
}
