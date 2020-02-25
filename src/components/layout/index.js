import React, { Component } from 'react';
import './index.css';
import Home from '../home';
import SignUp from '../signUp';
import LogIn from '../logIn';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import * as UserActions from "../../actions/user";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Layout extends Component {
  componentDidMount() {
    this.props.actions.getCurrentUser()
  }

  render() {
    return (
      <Router>
        <Container>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Log In</Nav.Link>
            </Nav>
          </Navbar>

          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
        </Container>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.data.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
