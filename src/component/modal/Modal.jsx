import React, { useState } from "react";
import { Modal } from "react-bootstrap";
//import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";


const ModalComponent= ({Msg})=> {

const [show, setShow] = useState(true);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {Msg}</p> 
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal> 
  )
}

export default ModalComponent