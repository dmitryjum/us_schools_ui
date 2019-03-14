import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';

function Layout() {
  return (
    <Router>
      <Container>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav>
            <Nav.Link href="#SignUp">Sign Up</Nav.Link>
            <Nav.Link href="#LogIn">Log In</Nav.Link>
          </Nav>
        </Navbar>
        <Route exact path="/" component={Home} />
      </Container>
    </Router>
  );
}

ReactDOM.render(<Layout />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
