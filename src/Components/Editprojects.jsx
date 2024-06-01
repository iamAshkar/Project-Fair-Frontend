import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from 'react-icons/fa';
import { serverURL } from "../Services/serverURL";
import { updateAUserProjectAPI } from "../Services/allAPIs";
import { editProjectResponseContext } from "../ContextAPI/ContextShare";
import Swal from 'sweetalert2'





function EditProjects({projects}) {
  console.log(projects);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectData({
      id:projects._id,
      title: projects.title,
      language: projects.language,
      github: projects.github,
      livelink: projects.livelink,
      overview: projects.overview,
      projectImage: ""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  const {editProjectResponse,setEditProjectResponse}= useContext(editProjectResponseContext)


  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [fileStatus, setFileStatus] = useState(false);
  const [projectData, setProjectData] = useState({
    id:projects._id,
    title: projects.title,
    language: projects.language,
    github: projects.github,
    livelink: projects.livelink,
    overview: projects.overview,
    projectImage: ""
  });

  useEffect(() => {
    if (projectData.projectImage && (projectData.projectImage.type === "image/png" || projectData.projectImage.type === "image/jpeg" || projectData.projectImage.type === "image/jpg")) {
      setPreview(URL.createObjectURL(projectData.projectImage));
      setFileStatus(false);
    } else {
      setFileStatus(true);
    }
  }, [projectData.projectImage]);



  const updateProject = async()=>{
    const {id, title, language, github, livelink, overview, projectImage } = projectData;
  
    const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("livelink", livelink);
      reqBody.append("overview", overview);
     preview? reqBody.append("projectImage", projectImage):reqBody.append("projectImage", projects.projectImage)
     //req header
     const token = sessionStorage.getItem("token")
     //if there is a change in image
     if (preview) {
         const reqHeader = {
             "Content-Type" : "multipart/form-data",
             "Authorization" : `Bearer ${token}`
           }
           //api call
           const result = await updateAUserProjectAPI(id,reqBody,reqHeader)
           console.log(result);
           if (result.status===200) {
            alert("project updated")
            setEditProjectResponse(result.response.data)
            handleClose()

           }else{
            alert("project not updated")
           }
  }
  else{
    const reqHeader = {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    }
    //api call
    const result = await updateAUserProjectAPI(id,reqBody,reqHeader)
    console.log(result);
    if (result.status===200) {
      Swal.fire({
        title: 'Success!',
        text: 'Updated successfull',
        icon: 'success',
        confirmButtonText: 'Back'
      
      })
    
      setEditProjectResponse(result.response.data)
      handleClose()

    }else{
     alert("project not updated")
    }
  }

}

  return (
    <div>
      <Button onClick={handleShow} className="btn  text-dark  ">
        <FaEdit />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Your Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-6 mt-4 p-5">
              <label htmlFor="projectImageInput">
              <input
  id="projectImageInput"
  onChange={(e) => setProjectData({ ...projectData, projectImage: e.target.files[0] })}
  type="file"
  style={{ display: "none" }}
/>

                <img
                  width={"300px"} 
                  src={preview?preview:`${serverURL}/uploads/${projects.projectImage}`}
                  
                  
                  alt=""
                />
              </label>
              {fileStatus && (
                <p className="text-danger m--2">
                  *please upload following image extension (png, jpeg, jpg) only
                </p>
              )}
            </div>
            <div className="col-sm-6 text-center">
              <input
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                value={projectData.title}
                type="text"
                placeholder="Project Title"
                className="form-control mb-3"
              />
              <input
                onChange={(e) => setProjectData({ ...projectData, language: e.target.value })}
                value={projectData.language}

                type="text"
                placeholder="Language Used"
                className="form-control mb-3"
              />
              <input
                onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
                value={projectData.github}

                type="text"

                placeholder="Github link"
                className="form-control mb-3"
              />
              <input
                onChange={(e) => setProjectData({ ...projectData, livelink: e.target.value })}
                value={projectData.livelink}

                type="text"
                placeholder="Live link"
                className="form-control mb-3"
              />
              <input
                onChange={(e) => setProjectData({ ...projectData, overview: e.target.value })}
                value={projectData.overview}

                type="text"
                placeholder="Overview"
                className="form-control mb-3"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={updateProject} className="btn btn-light text-dark m-5">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProjects;
