import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addProjectAPI } from "../Services/allAPIs";
import { addProjectResponseContext } from "../ContextAPI/ContextShare";
import Swal from 'sweetalert2'


function Addprojects() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [fileStatus, setFileStatus] = useState(false);
  const [projectData, setProjectdata] = useState({
    title: "",
    language: "",
    github: "",
    livelink: "",
    overview: "",
    projectImage: "",
  });

  useEffect(() => {
    console.log(projectData.projectImage.type);
    if (
      projectData.projectImage.type == "image/png" ||
      projectData.projectImage.type == "image/jpeg" ||
      projectData.projectImage.type == "image/jpg"
    ) {
      console.log("generate image url");
      //file to url conversion
      console.log(URL.createObjectURL(projectData.projectImage));
      setPreview(URL.createObjectURL(projectData.projectImage));
      setFileStatus(false);
    } else {
      console.log(
        "please upload following image extention (png,jpeg,jpg)..only"
      );
      setFileStatus(true);
    }
  }, [projectData.projectImage]);

  // console.log(projectData);

  const handleAddProject = async () => {
    //data passing
    const { title, language, github, livelink, overview, projectImage } =
      projectData;
    if (
      !title ||
      !language ||
      !github ||
      !livelink ||
      !overview ||
      !projectImage
    ) {
      alert("Please fill all the required fields");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("livelink", livelink);
      reqBody.append("overview", overview);
      reqBody.append("projectImage", projectImage);
  
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        };
  
        try {
          //api call
          const result = await addProjectAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status == 200) {
            // alert("Project added successfully!");
            Swal.fire({
              title: 'Success!',
              text: 'Project Added successfull',
              icon: 'success',
              confirmButtonText: 'Back'
            
            })
           
            setAddProjectResponse(result.data)
           
            handleClose(); // Close the modal
            // Reset form fields and preview
            setProjectdata({
              title: "",
              language: "",
              github: "",
              livelink: "",
              overview: "",
              projectImage: "",
            });
            setPreview("");
          } else {
            alert(result.response.data);
          }
        } catch (error) {
          console.error("Error adding project:", error);
          // Handle error appropriately
        }
      }
    }
  };
  

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }); 

  return (
    <div>
      <button onClick={handleShow} className="btn btn-light text-dark m-5">
        Add
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Your Projects</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-6 mt-4 p-5">
              <label>
                <input
                  onChange={(e) =>
                    setProjectdata({
                      ...projectData,
                      projectImage: e.target.files[0],
                    })
                  }
                  type="file"
                  style={{ display: "none" }}
                />
                <img
                  width={"300px"}
                  src={
                    preview
                      ? preview
                      : "https://institute.careerguide.com/wp-content/uploads/2020/10/e426702edf874b181aced1e2fa5c6cde.gif"
                  }
                  alt=""
                />
              </label>
              {fileStatus && (
                <p className="text-danger m--2">
                  {" "}
                  *please upload following image extention (png,jpeg,jpg)..only
                </p>
              )}
            </div>
            <div className="col-sm-6 text-center">
              <input
                onChange={(e) =>
                  setProjectdata({ ...projectData, title: e.target.value })
                }
                type="text"
                placeholder="Project Titile"
                className="form-control mb-3"
              />
              <input
                onChange={(e) =>
                  setProjectdata({ ...projectData, language: e.target.value })
                }
                type="text"
                placeholder="Language Used"
                className="form-control mb-3"
              />
              <input
                onChange={(e) =>
                  setProjectdata({ ...projectData, github: e.target.value })
                }
                type="text"
                placeholder="Github link"
                className="form-control mb-3"
              />
              <input
                onChange={(e) =>
                  setProjectdata({ ...projectData, livelink: e.target.value })
                }
                type="text"
                placeholder="Live link"
                className="form-control mb-3"
              />
              <input
                onChange={(e) =>
                  setProjectdata({ ...projectData, overview: e.target.value })
                }
                type="text"
                placeholder="Overview "
                className="form-control mb-3"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={handleAddProject}
            className="btn btn-light text-dark m-5"
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Addprojects;
