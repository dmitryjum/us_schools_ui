import React, { useState, useEffect } from 'react';
import { Modal, Button, FormControl, InputGroup, Badge, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, updateSchool } from "../../actions/schoolModal";

const SchoolModal = () => {
  const modalShow = useSelector(state => state.schoolModal.show);
  const school = useSelector(state => state.schoolModal.school);
  const user = useSelector(state => state.user.data.currentUser);
  const [schoolDetails, setSchoolDetails] = useState({});
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const [oldKey, setOldKey] = useState("")
  let timer = null
  
  // 3. Allow edit school title, if school got initial title '' from state
  // 5. Create a button to add a line with 2 input fields for key/value pair for details column
  // 6. That button should just add '': '' pair to details state object and the component will rerender
  // 7. The component should defirintiate new school with no id in state and edited school with existing id in state
  // 8. Make sure school list updates with correct page and filters when school is updated or created
  useEffect(() => {
    setSchoolDetails(school.details)
  }, [school.details, schoolDetails])

  function handleSubmit(e) {
    e.preventDefault()
    setSchoolDetails(Object.assign(schoolDetails, { "last edited by": user.email }))
    dispatch(updateSchool({auth_token: user.auth_token, school}))
  }

  function onTimedChange(e, handler) {
    e.persist() //allows to send event in async call back without loss
    clearTimeout(timer)
    timer = setTimeout(() => {
      handler(e);
    }, 500)
  }

  const handleKeyChange = (e) => {
    const currentValue = schoolDetails[oldKey];
    delete schoolDetails[oldKey]
    setSchoolDetails(Object.assign(schoolDetails, { [e.target.value]: currentValue }))
    setOldKey(e.target.value)
  }

  const handleValueChange = (e) => {
    const nearestKey = e.target.closest('div.row').querySelector("input[name='Key']").value
    setSchoolDetails(Object.assign(schoolDetails, { [nearestKey]: e.target.value }))
  }

  const handleOnFocus = (e) => {
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
                        onTimedChange(e, handleKeyChange)
                      }}
                      onFocus={(e) => {
                        handleOnFocus(e)
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
                      onChange={(e) => onTimedChange(e, handleValueChange)}
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