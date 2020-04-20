import React, { Component } from 'react';
import './index.css';
import Home from '../home';
import SignUp from '../signUp';
import LogIn from '../logIn';
import SearchSchool from '../SearchSchool';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import * as UserActions from "../../actions/user";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Layout extends Component {
  constructor(props) {
    super(props)
    this.home = this.home.bind(this)
    this.logSign = this.logSign.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    this.props.actions.getCurrentUser()
  }

  logOut(e) {
    e.preventDefault()
    this.props.actions.logOut()
  }

  home() {
    if (this.props.isAuthenticated) {
      return <Navbar.Brand href="/">Welcome Home {this.props.currentUser.email}</Navbar.Brand>
    } else {
      return <Navbar.Brand href="/">Home</Navbar.Brand>
    }
  }

  logSign() {
    if (this.props.isAuthenticated) {
      return <Nav.Link href="#" onClick={(e) => this.logOut(e)}>Log Out</Nav.Link>
    } else {
      return (
        <>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          <Nav.Link href="/login">Log In</Nav.Link>
        </>
      )
    }
  }

  render() {
    return (
      <Router>
        <Navbar bg="dark" variant="dark">
          {this.home()}
          <Nav className="mr-auto"><SearchSchool /></Nav>
          <Nav>{this.logSign()}</Nav>
        </Navbar>
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
