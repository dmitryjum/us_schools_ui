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
        <SearchSchool search={this.props.actions.search} />
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
    schools: state.schools.data.records
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
// 9: Create SignUp page and integrate it with Redux
// 10: Create Login page and integrate it with Redux
// (https://tighten.co/blog/react-101-part-4-firebase,
// https://www.thegreatcodeadventure.com/jwt-storage-in-rails-the-right-way/)
// 11: Create Add New School Modal
// 12: Create Edit school functionality
// 13: Add more schools to list with button in the bottom
// 14: Add school card drop down with school details info
// 15: Configure webpack
// 16: Find ways to host it
// 17: Write tests
