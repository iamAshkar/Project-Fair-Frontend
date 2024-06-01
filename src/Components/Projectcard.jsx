import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { serverURL } from "../Services/serverURL";


function Projectcard({ project }) {
  console.log(project);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card style={{ width: "18rem" }} onClick={handleShow}>
        <Card.Img
          variant="top"
          src={project? `${serverURL}/uploads/${project.projectImage}`  : "https://tse3.mm.bing.net/th?id=OIP.TwWVsOFCFCigU_966oaEJAHaFj&pid=Api&P=0&h=180"
          }
          height={"300px"}
        />
        <Card.Body>
          <Card.Title className="text-center">{project.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6 ">
              <img
                src={project? `${serverURL}/uploads/${project.projectImage}`  : "https://tse3.mm.bing.net/th?id=OIP.TwWVsOFCFCigU_966oaEJAHaFj&pid=Api&P=0&h=180"
              }
                alt=""
                width={"100%"}
              />
            </div>
            <div className="col-6 text-center">
              <h2>{project.title}</h2>
              <p style={{ textAlign: "justify" }}>
                Description {project.overview}{" "}
              </p>
              <p>
                Technology used : <b> {project.language} </b>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between">
            <button className=" btn me-5">
              <a href={project.github} target="_blank">
                <FaGithub />
              </a>
            </button>
            <button className=" btn me-5">
              <a href={project.livelink} target="_blank">
                <FaLink />
              </a>
            </button>
          </div>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Projectcard;
