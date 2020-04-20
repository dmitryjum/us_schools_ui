import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./index.css";
import { Card, Accordion, Button, Table } from 'react-bootstrap';
import { openModal } from "../../actions/schoolModal";

const SchoolList = ({schools}) => {
  const isAuthenticated = useSelector(state => state.user.data.isAuthenticated)
  const dispatch = useDispatch();

  function schoolModalButton(school) {
    if(isAuthenticated) {
      return(
        <Button className="school-modal-button"
          variant="outline-warning"
          onClick={() => {dispatch(openModal({school}))}}>
            Edit School
        </Button>
      )
    }
  }

  return (
    <>
      <h3>Schools</h3>
      <Accordion defaultActiveKey="0">
        {schools.map((school, id) => (
          <Card key={id}>
            <Accordion.Toggle as={Card.Header} eventKey={id}>
              <Card.Title>{school.title}</Card.Title>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={id}>
              <Card.Body>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(school.details).map((prop, id) => {
                      return (
                        <tr key={id}>
                          <td>{prop}</td>
                          <td>{school.details[prop]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                {schoolModalButton(school)}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
}

export default SchoolList;