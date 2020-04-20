import React, { Component } from 'react';
import { Form, Button, Jumbotron, Col, ListGroup } from 'react-bootstrap';
import "./index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../actions/user";

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.logInResult = this.logInResult.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.logIn({
      'email': this.emailRef.current.value,
      'password': this.passwordRef.current.value,
    })
  }

  logInResult() {
    const msg = this.props.logInMessage;
    if (Object.keys(msg).length > 0) {
      [
        this.emailRef.current.value,
        this.passwordRef.current.value,
      ] = ['', ''];
      return (
        <ListGroup variant="flush">
          {
            msg.messages.map((message, id) => {
              return <ListGroup.Item variant={msg.type} key={id}>{message}</ListGroup.Item>
            })
          }
        </ListGroup>
      );
    }
  }

  render() {
    return (
      <Col md={{ span: 8, offset: 2 }}>
        <Jumbotron className="log-in-form">
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={this.emailRef}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={this.passwordRef}
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
          {this.logInResult()}
        </Jumbotron>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    logInMessage: state.user.data.logInMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);