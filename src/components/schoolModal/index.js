import React, { useState, useEffect } from 'react';
import { Modal, Button, FormControl, InputGroup, Badge, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from "../../actions/schoolModal";

const SchoolModal = () => {
  const modalShow = useSelector(state => state.schoolModal.show);
  const school = useSelector(state => state.schoolModal.school);
  const [schoolDetails, setSchoolDetails] = useState({});
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const updateKeyCb = handleKeyChange.bind(this)
  const onFocusCb = handleOnFocus.bind(this)
  const onValueChange = handleValueChange.bind(this)
  const [oldKey, setOldKey] = useState("")
  let timer = null
  
  // 3. Allow edit school title, if school got initial title '' from state
  // 5. Create a button to add a line with 2 input fields for key/value pair for details column
  // 6. That button should just add '': '' pair to details state object and the component will rerender
  // 7. The component should defirintiate new school with no id in state and edited school with existing id in state
  useEffect(() => {
    setSchoolDetails(school.details)
  }, [school.details, schoolDetails])

  function handleSubmit(e) {
    e.preventDefault()
    console.log(schoolDetails)
  }

  function onTimedChange(e, handler) {
    e.persist()
    clearTimeout(timer)
    timer = setTimeout(() => {
      handler(e);
    }, 500)
  }

  function handleKeyChange(e) {
    const currentValue = schoolDetails[oldKey];
    delete schoolDetails[oldKey]
    setSchoolDetails(Object.assign(schoolDetails, { [e.target.value]: currentValue }))
    setOldKey(e.target.value)
  }

  function handleValueChange(e) {
    const nearestKey = e.target.closest('div.row').querySelector("input[name='Key']").value
    setSchoolDetails(Object.assign(schoolDetails, { [nearestKey]: e.target.value }))
  }

  function handleOnFocus(e) {
    setOldKey(e.target.value)
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
        {
          Object.keys(schoolDetails).map((key, index) => {
            return (
              <Row key={index}>
                <Col>
                  <InputGroup size="sm">
                    <FormControl
                      name="Key"
                      placeholder="Key"
                      aria-label="Key"
                      defaultValue={key}
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => {
                        onTimedChange(e, updateKeyCb)
                      }}
                      onFocus={(e) => {
                        onFocusCb(e)
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup size="sm">
                    <FormControl
                      name="Value"
                      placeholder="Value"
                      aria-label="Value"
                      defaultValue={schoolDetails[key]}
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => onTimedChange(e, onValueChange)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            )
          })
        }
      </Modal.Body>
      <Modal.Footer>
        <Badge pill variant="secondary">{school.updated_at}</Badge>
        <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SchoolModal;