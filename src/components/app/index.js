import React, { Component } from 'react';
import SchoolList from '../schoolList'
import * as constants from '../../constants/env/us_states'
import './index.css';
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schools: []
    }
  }

  async componentDidMount() {
    const response = await axios.get(`${constants.US_STATE_UNIVERSITIES_LOCAL_HOST}/api/v1/schools`, {
      headers: {'Accept': 'application/json'},
      params: {'page': 1, 'per_page': 20}
    })
    this.setState({schools: response.data.records})
  }

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <SchoolList schools={this.state.schools} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default App;

//TODO:
// 1: Create API class for for all the requests that will be used within the app
// 2: Bring the schools request to SchoolList component
// 3: Create SchoolCard component for each school card
// 4: Create TopKeys component with search links for each key
// 5: Add Search bar section above TopKeys and SchoolList compnents
// 6: Add NavBar with LogIn/SignUp
// 6.1: Add React Router
// 7: Make search work either according current API end points,
// or add full text search functionality to api
// 8: Integrate Redux with SchoolList, TopKeys and SchoolSearch
// 9: Create SignUp page and integrate it with Redux
// 10: Create Login page and integrate it with Redux
// 11: Create Add New School Modal
// 12: Create Edit school functionality
// 13: Add more schools to list with button in the bottom
