import React, { useEffect, useState } from 'react'
import Projectcard from '../Components/Projectcard'
import { getUserProjectsAPI } from '../Services/allAPIs'

function Projects() {

  const[searchKey,setSearchKey] = useState("")// 

 const [AllUserProject,SetAllUserProject] = useState([])

  const getAllUserProject = async(req,res)=>{
    //get token ? authenicated
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + token
      }
      const result = await getUserProjectsAPI(searchKey,reqHeader)
    console.log(result);
    if (result.status== 200) {
      SetAllUserProject(result.data)
    }
    else{
      //error
      console.log(result.response.data);
    }
    }
    
   
  }
  useEffect(()=>{
    getAllUserProject()
        },[searchKey])
        console.log(searchKey);
  return (
    <div>
      <h2 className='text-center m-4'>
        All Projects
      </h2>
      <input onChange={e=>setSearchKey(e.target.value)} style={{ width: '300px', marginLeft: '550px' }} type="text" placeholder='search by Technology' className='form-control mx-auto' />
<div className="row">
{
  AllUserProject.length>0? AllUserProject.map(item=>(
    <div className="col m-4">
    <Projectcard project={item}/>
  </div>
  )): "_____Cant Fetch All projects"
}
</div>

    </div>
  )
}

export default Projects
