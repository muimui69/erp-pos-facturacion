import apis,{converToStringfy} from "../Api";
import { BranchOfficeData } from "../constants";


export const getAllBranchs =async ()=>{
    try {
        const {data}= await apis.get('/branch')
        return data
    } catch (error) {
        throw error
        
    }
}

export const getBranchsId =async (id:number)=>{
    try {
        const {data}= await apis.get(`/branch/${id}`)
        return data
    } catch (error) {
        throw error
        
    }
}

export const PostCreateBranch =async (address:string,name:string,lat:number,lng:number,cityId:number)=>{
    try {
        const obj={
            address,
            name,
            lng,
            lat,
            cityId
        }
        return await apis.post('/branch',converToStringfy(obj))

    } catch (error) {
        throw error
    }

}

export const DeleteBranch= async(id:number)=>{
    try {
        const { data } = await apis.delete(`/branch/${id}`);
        return data;
    } catch (err) {
        throw err;
    }

}

export const updateBranchOffice = async (id: string, updatedData: BranchOfficeData) => {
    try {
      return await apis.put(`/branch/${id}`, updatedData);
    } catch (error) {
      throw error
    }
  };