import React from 'react';
import { Modal, Button, FormControl, InputGroup, Badge, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, updateSchool, openModal } from "../../actions/schoolModal";

const SchoolModal = () => {
  const modalShow = useSelector(state => state.schoolModal.show);
  const school = useSelector(state => state.schoolModal.school);
  const user = useSelector(state => state.user.data.currentUser);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  let timer = null
  let oldKey = ""
  // 2. Try to preserve search or filter state after School update
  // 3. Allow edit school title, if school got initial title '' from state
  // 5. Create a button to add a line with 2 input fields for key/value pair for details column
  // 7. The component should defirintiate new school with no id in state and edited school with existing id in state
  // 8. Make sure school list updates with correct page and filters when school is updated or created

  function handleSubmit(e) {
    e.preventDefault()
    school.details["last edited by"] = user.email;
    dispatch(updateSchool({auth_token: user.auth_token, school}))
  }

  const addARow = () => {
    school.details[""] = ""
    dispatch(closeModal())
    dispatch(openModal({ school }))
  }

  function onTimedChange(e, handler) {
    e.persist() //allows to send event in async call back without loss
    clearTimeout(timer)
    timer = setTimeout(() => {
      handler(e);
    }, 500)
  }

  const handleKeyChange = (e) => {
    const currentValue = school.details[oldKey];
    delete school.details[oldKey];
    school.details[e.target.value] = currentValue;
    dispatch(openModal({ school }));
    oldKey = e.target.value
  }

  const handleValueChange = (e) => {
    const nearestKey = e.target.closest('div.row').querySelector("input[name='Key']").value
    school.details[nearestKey] = e.target.value;
    dispatch(openModal({ school }));
  }

  const handleOnFocus = (e) => {
    oldKey = e.target.value
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
            Object.keys(school.details).map((key, index) => {
              if (key === "last edited by") return null;
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
                        defaultValue={school.details[key]}
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
        <Badge pill variant="info"><i>Edited by:</i> {school.details["last edited by"]}</Badge>
        <Badge pill variant="secondary"><i>On:</i> {new Date(Date.parse(school.updated_at)).toDateString()}</Badge>
        <Button variant="info"  onClick={addARow}>
          Add a row
        </Button>
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