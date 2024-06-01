import React, { useContext, useEffect, useState } from 'react';
import Addprojects from './Addprojects';
import { FaGithub } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getAUserProjectAPI } from '../Services/allAPIs';
import Editprojects from './Editprojects';
import { addProjectResponseContext, editProjectResponseContext } from '../ContextAPI/ContextShare';
import { deleteAUserProjectAPI } from '../Services/allAPIs';
import Swal from 'sweetalert2'






function MyProjects() {
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)


    const [OneUserProject, SetOneUserProject] = useState([]);

    const getUserproject = async(req,res) => {
        if (sessionStorage.getItem('token')) {
            const token = sessionStorage.getItem('token');
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token
            };
            
                const result = await getAUserProjectAPI(reqHeader)
                console.log(result);
                if(result.status == 200) {
                    SetOneUserProject(result.data);
                } else {
                    console.log(result.response.data);
                }
            
        }
    };

    useEffect(() => {
        getUserproject();
    }, [addProjectResponse,editProjectResponse]);

    console.log(OneUserProject);
  


    const deleteUserProject = async (pid)=>{
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + token
              }
              const result = await deleteAUserProjectAPI(pid,reqHeader)
              console.log(result);
              Swal.fire({
                title: 'Success!',
                text: 'Deleted Successfully',
                icon: 'success',
                confirmButtonText: 'Back'
              })         
          getUserproject()
        }
    }
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <h3 className='ms-5'>My Projects</h3>
                <Addprojects />
            </div>

         {
            OneUserProject.length>0? OneUserProject.map(item=>(
                <div className='row shadow m-4 p-4'>
                
                <div  className='col-6'>
                    <h4>{item.title}</h4>
                    <div className='d-flex justify-content-evenly'>
                        <button className='btn'>
                            <a href={item.github}><FaGithub /></a>
                        </button>
                        <Editprojects projects={item}/>
                        <button onClick={()=>deleteUserProject(item._id)} className='btn'>
                            <MdDelete />
                        </button>
                    </div>
                </div>
      
    </div>
            ))  : '____________project not found'
         }
        </div>
    );
}

export default MyProjects;
