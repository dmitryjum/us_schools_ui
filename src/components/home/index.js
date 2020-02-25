import React, { Component } from 'react';
import SchoolList from '../schoolList';
import TopTwentyKeys from '../topTwentyKeys';
import SearchSchool from '../SearchSchool';
import './index.css';
import { Row, Col, Alert} from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SchoolListActions from "../../actions/schoolList";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signUpAlertShow: !this.props.isAuthenticated
    }
  }

  componentDidMount() {
    this.props.actions.requestSchools({'page': 1, 'per_page': 10})
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
        <Alert show={this.state.signUpAlertShow} variant={'warning'} onClose={() => this.closeSignUpAlert()} dismissible>
          Please <Alert.Link href="/signup">Sign Up</Alert.Link> or <Alert.Link href="/login">Log In</Alert.Link> if you want to edit or add schools.
        </Alert>
        <Row>
          <Col>
            <TopTwentyKeys findByKey={this.props.actions.requestSchools} />
          </Col>
          <Col>
            <SchoolList schools={this.props.schools} />
          </Col>
        </Row>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    schools: state.schools.data.records,
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
// 11: Create Add New School Modal
// 12: Create Edit school functionality
// 13: Add more schools to list with button in the bottom
// 15: Configure webpack
// 16: Find ways to host it
// 17: Write tests
