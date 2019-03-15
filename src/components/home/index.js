import React, { Component } from 'react';
import SchoolList from '../schoolList';
import TopTwentyKeys from '../topTwentyKeys';
import SearchSchool from '../SearchSchool';
import './index.css';
import { Row, Col} from 'react-bootstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SchoolListActions from "../../actions/schoolList";

class Home extends Component {

  componentDidMount() {
    this.props.actions.requestSchools({'page': 1, 'per_page': 10})
  }

  render() {
    return (
      <>
        <SearchSchool/>
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
    schools: state.schools.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SchoolListActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//TODO:
// 3: Create SchoolCard component for each school card
// 7: Make search work either according current API end points,
// or add full text search functionality to api
// 9: Create SignUp page and integrate it with Redux
// 10: Create Login page and integrate it with Redux
// 11: Create Add New School Modal
// 12: Create Edit school functionality
// 13: Add more schools to list with button in the bottom
