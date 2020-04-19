import React, { Component } from 'react';
import './index.css';
import Home from '../home';
import SignUp from '../signUp';
import LogIn from '../logIn';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
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
        {this.navBar()}
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute authenticated={this.props.isAuthenticated} path="/login" component={LogIn} />
      </Router>
    );
  }
}

const PrivateRoute = ({component: Component, authenticated, ...props}) => {
  return (
    <Route
      {...props}
      render={(props) => !authenticated
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
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
