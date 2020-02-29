import React, { Component } from 'react';
import SchoolList from '../schoolList';
import TopTwentyKeys from '../topTwentyKeys';
import SearchSchool from '../SearchSchool';
import './index.css';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SchoolListActions from "../../actions/schoolList";

class Home extends Component {

  componentDidMount() {
    this.props.actions.requestSchools()
  }

  closeSignUpAlert() {
    this.setState({
      signUpAlertShow: false
    })
  }

  render() {
    return (
      <>
        <SearchSchool search={this.props.actions.search} />
        <Alert show={!this.props.isAuthenticated} variant={'warning'}>
          Please <Alert.Link href="/signup">Sign Up</Alert.Link> or <Alert.Link href="/login">Log In</Alert.Link> if you want to edit or add schools.
        </Alert>
        <Row>
          <Col>
            <TopTwentyKeys findByKey={this.props.actions.requestSchools} />
          </Col>
          <Col>
            <SchoolList schools={this.props.schools} />
            <Button variant="primary"
             size="lg"
             onClick={() => this.props.actions.addMoreSchools()}
             block
            >
              More schools!
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    schools: state.schools.records,
    page: state.schools.schoolPage,
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
// 10: Sync More schools button with Top Twenty School functionality
// 11: Create Add New School Modal
// 12: Create Edit school functionality
// 15: Configure webpack
// 16: Find ways to host it
// 17: Write tests
// Bugs: Redirect to root if logged in from LogIn
