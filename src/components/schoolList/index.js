import React from 'react';
import { useSelector } from 'react-redux'
import "./index.css";
import { Card, Accordion, ListGroup, Button } from 'react-bootstrap';

const SchoolList = ({schools}) => {
  const isAuthenticated = useSelector(state => state.user.data.isAuthenticated)
  function schoolModalButton () {
    if(isAuthenticated) {
      return(
        <Button className="school-modal" variant="info">Go somewhere</Button>
      )
    }
  }

  return (
    <>
      <h3>School Results</h3>
      <Accordion defaultActiveKey="0">
        {schools.map((school, id) => (
          <Card key={id}>
            <Accordion.Toggle as={Card.Header} eventKey={id}>
              <Card.Title>{school.title}</Card.Title>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={id}>
              <Card.Body>
                <ListGroup variant="flush">
                  {Object.keys(school.details).map((prop, id) => {
                    return (
                      <ListGroup.Item key={id}>{`${prop}: ${school.details[prop]}`}</ListGroup.Item>
                    );
                  })}
                </ListGroup>
                {schoolModalButton()}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
}

export default SchoolList;