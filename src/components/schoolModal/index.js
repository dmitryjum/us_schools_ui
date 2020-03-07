import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from "../../actions/schoolModal";

const SchoolModal = () => {
  const modalShow = useSelector(state => state.schoolModal.show);
  const school = useSelector(state => state.schoolModal.school);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  function handleSubmit(e) {
    e.preventDefault()
    console.log()
  }
  
  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {school.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {
            Object.keys(school).map((key,index) => {
              return(
                <InputGroup size="sm" key={index}>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">{key}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control value={school[key]} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
              )
            })
          }
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SchoolModal;