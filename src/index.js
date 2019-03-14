import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home';
import SignUp from './components/signUp';
import LogIn from './components/logIn';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore()

function Layout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

ReactDOM.render(<Layout />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
