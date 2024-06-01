import { serverURL } from "./serverURL"
import { commonAPI } from "./commonAPI"

// register api call

export const registerAPI = async(user)=>{
   return await commonAPI("post",`${serverURL}/register`,user,"")
}

//login api call


export const loginAPI = async(user)=>{
   return await commonAPI("post",`${serverURL}/login`,user,"")
}

// add-project api call

export const addProjectAPI = async(reqBody,reqHeader)=>{
   return await commonAPI("post",`${serverURL}/project/add-project`,reqBody,reqHeader)

}

//get home project api call

export const getHomeProjectAPI = async()=>{
   return await commonAPI("get",`${serverURL}/project/home-project`,"","")
}

// get all users project api call
//query parameter for serach
export const getUserProjectsAPI = async(searchKey,reqHeader)=>{
   return await commonAPI("get",`${serverURL}/project/all-user-project?search=${searchKey}`,"",reqHeader)
}

// get a project api call

export const getAUserProjectAPI = async (reqHeader)=>{
   return await commonAPI("get",`${serverURL}/project/get-auser-project`,"",reqHeader)
}

//delete user project api

export const deleteAUserProjectAPI = async (projectId,reqHeader)=>{
   return await commonAPI("delete",`${serverURL}/project/delete-auser-project/${projectId}`,{},reqHeader)
}

//update a user project API Call
export const updateAUserProjectAPI = async(projectId,reqBody,reqHeader)=>{
   return await commonAPI("put",`${serverURL}/project/update-user-project/${projectId}`,reqBody,reqHeader)
}