import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap';
import USUApi from '../../utils/api';

class SchoolList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schools: []
    }
  }

  async componentDidMount() {
    const response = await USUApi.getSchools({ 'page': 1, 'per_page': 20 })
    this.setState({ schools: response.data.records })
  }

  render() {
    return (
      <ul>
        {
          this.state.schools.map((school) => (
            <Card key={school.id}>
              <Card.Body>
                <Card.Title>{school.title}</Card.Title>
              </Card.Body>
            </Card>
          ))
        }
      </ul>
    );
  }
}

SchoolList.propTypes = {
    schools: PropTypes.array,
};

export default SchoolList;