import React from 'react';
import PropTypes from 'prop-types'
const SchoolList = ({ schools }) => {
    return (
      <ul>
        {schools.map(school => <li key={school.id}>{school.title}</li>)}
      </ul>
    );
};

SchoolList.displayName = 'SchoolList';

SchoolList.propTypes = {
    schools: PropTypes.array,
};

export default SchoolList;
