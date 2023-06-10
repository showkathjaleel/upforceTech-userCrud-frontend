
import { BASE_URL } from "./constants";
import axios from "axios";
export const addUser = async(userInfo)=>{
    return await axios.post(`${BASE_URL}/user/add-user` ,
    {
        userInfo
    } ,
    {
        headers : {
            "Content-Type":"multipart/form-data"
        }
    })
}

export const usergetfunc = async(page)=>{
    return await axios.get( `${BASE_URL}/user/paginated-users?page=${page}`)   
}

export const fetchAllUser= async () => {
    return await axios.get( `${BASE_URL}/user/all-user`) 
}

export const fetchUser = async(id)=>{
    return await axios.get(`${BASE_URL}/user/${id}`);
}

export const editUser = async(id,data)=>{

    return await axios.put(`${BASE_URL}/user/edit-user/${id}`, 
        data
    ,
    {
       headers:{
        "Content-Type":"multipart/form-data"
      }
    });
}

export const deleteFunc = async(id)=>{
    return await axios.delete( `${BASE_URL}/user/delete-user/${id}` )
  
}


export const exporttocsvfunc = async()=>{
    return await axios.get(`${BASE_URL}/user/export-user`)
    
}

