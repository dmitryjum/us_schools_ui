import React from 'react';
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap';

const SchoolList = ({ schools }) => {
    return (
      <ul>
        {
          schools.map((school) => (
            <Card key={school.id}>
              <Card.Body>{school.title}</Card.Body>
            </Card>
          ))
        }
      </ul>
    );
};

SchoolList.displayName = 'SchoolList';

SchoolList.propTypes = {
    schools: PropTypes.array,
};

export default SchoolList;
