import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SchoolListActions from '../../actions/schoolList'

class SchoolList extends Component {

  componentDidMount() {
    this.props.actions.requestSchools()
  }

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
    schools: state.schools.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SchoolListActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolList);