import React, { Component } from 'react';
import SchoolList from '../schoolList';
import TopTwentyKeys from '../topTwentyKeys'
import './index.css';
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap';

class App extends Component {

  render() {
    return (
      <Container>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Nav>
            <Nav.Link href="#SignUp">Sign Up</Nav.Link>
            <Nav.Link href="#LogIn">Log In</Nav.Link>
          </Nav>
        </Navbar>
        <Row>
          <Col>
            <TopTwentyKeys/>
          </Col>
          <Col>
            <SchoolList/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

//TODO:
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
