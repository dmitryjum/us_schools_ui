import React, { useRef } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from "../../actions/schoolModal";

const SchoolModal = () => {
  const modalShow = useSelector(state => state.schoolModal.show);
  const school = useSelector(state => state.schoolModal.school);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const inputEl = useRef(null);

  // 1. Use useState hook for details object
  // 2. Show school title and date last updated as read only or non-input fields
  // 3. Allow edit school title, if school got initial title '' from state
  // 4. Keep state in useRef hook, or in useState, if details update causes loss of value
  // 5. Create a button to add a line with 2 input fields for key/value pair for details column
  // 6. That button should just add '': '' pair to details state object and the component will rerender
  // 7. The component should defirintiate new school with no id in state and edited school with existing id in state

  function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
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
          {/* {
            Object.keys(school).map((key,index) => {
              return(
                <InputGroup size="sm" key={index}>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">{key}</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control ref={inputEl} defaultValue={school[key]} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
              )
            })
          } */}
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