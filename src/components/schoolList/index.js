import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
// import USUApi from '../../utils/api';
import { connect } from 'react-redux';

class SchoolList extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     schools: []
  //   }
  // }

  // async componentDidMount() {
  //   const response = await USUApi.getSchools({ 'page': 1, 'per_page': 10 })
  //   this.setState({ schools: response.data.records })
  // }

  render() {
    return (
      <>
      <h3>School Results</h3>
      <ul>
        {
          this.props.schools.map((school) => (
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
}

function mapStateToProps(state) {
  return {
    schools: state.schools
  }
}

export default connect(mapStateToProps)(SchoolList);