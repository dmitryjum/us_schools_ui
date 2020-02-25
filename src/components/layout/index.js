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
  constructor(props) {
    super(props)
    this.navBar = this.navBar.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    this.props.actions.getCurrentUser()
  }

  logOut(e) {
    e.preventDefault()
    this.props.actions.logOut()
  }

  navBar() {
    if (this.props.isAuthenticated) {
      return(
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Welcome Home {this.props.currentUser.email}</Navbar.Brand>
          <Nav>
            <Nav.Link href="#" onClick={(e) => this.logOut(e)}>Log Out</Nav.Link>
          </Nav>
        </Navbar>
      )
    } else {
      return(
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Navbar>
      )
    }
  }

  render() {
    return (
      <Router>
        <Container>
          {this.navBar()}
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={this.props.isAuthenticated ? Home : LogIn} />
        </Container>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.data.isAuthenticated,
    currentUser: state.user.data.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
