import React from 'react';
import { Card } from 'react-bootstrap';

const SchoolList = ({schools}) => {
  return (
    <>
    <h3>School Results</h3>
    <ul>
      {
        schools.map((school) => (
          <Card key={school.id}>
            <Card.Body>
              <Card.Title>{school.title}</Card.Title>
            </Card.Body>
          </Card>
        ))
      }
    </ul>
    </>
  );
}

export default SchoolList;