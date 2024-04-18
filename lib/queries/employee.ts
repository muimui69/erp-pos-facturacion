import apis,{converToStringfy} from "../Api";

export const getEmployees=async()=>{
    try {
        const {data}=await apis.get('/employee')
        return data;

    } catch (error) {
        throw error        
    }
}


export const CreateAtm= async(email:string,name:string,phone:string,BranchId:number)=>{
    try {
        const obj={
            email,
            nombre:name,
            telefono:phone,
            BranchId
        }
        
        return await apis.post('/employee/atm',converToStringfy(obj));
       
    } catch (error) {
        throw error
    }
}



