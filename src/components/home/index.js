import React, { Component } from 'react';
import SchoolList from '../schoolList';
import TopTwentyKeys from '../topTwentyKeys';
import './index.css';
import { Row, Alert, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SchoolListActions from "../../actions/schoolList";

class Home extends Component {

  componentDidMount() {
    this.props.actions.requestSchools()
  }

  moreSchoolsButton() {
    if (this.props.page >= this.props.totalPages) return null
    return(
      <>
        <Button variant="outline-danger"
          className="more-schools-button"
          size="lg"
          onClick={() => this.props.actions.addMoreSchools()}
          block
        >
          More schools!
        </Button>
      </>
    )
  }

  render() {
    return (
      <>
        <Alert show={!this.props.isAuthenticated} variant={'warning'}>
          Please <Alert.Link href="/signup">Sign Up</Alert.Link> or <Alert.Link href="/login">Log In</Alert.Link> if you want to edit or add schools.
        </Alert>
        <Row className="main">
            <TopTwentyKeys findByKey={this.props.actions.findByKey} />
          <div>
            <SchoolList schools={this.props.schools} />
            {this.moreSchoolsButton()}
          </div>
        </Row>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    schools: state.schools.records,
    page: state.schools.schoolPage,
    totalPages: state.schools.totalPages,
    isAuthenticated: state.user.data.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SchoolListActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//TODO:
// 15: Configure webpack
// 17: Write tests
