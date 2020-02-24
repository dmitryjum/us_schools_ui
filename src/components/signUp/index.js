import React, { Component } from 'react';
import { Form, Button, Jumbotron, Col, Alert } from 'react-bootstrap';
import "./index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../actions/user";

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.passConfirmRef = React.createRef();
    this.signUpResult = this.signUpResult.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.actions.signUp({
      'email': this.emailRef.current.value,
      'password': this.passwordRef.current.value,
      'password_confirmation': this.passConfirmRef.current.value
    })
  }

  signUpResult() {
    const msg = this.props.signUpMessage;
      if (Object.keys(msg).length > 0) {
        [
          this.emailRef.current.value,
          this.passwordRef.current.value,
          this.passConfirmRef.current.value
        ] = ['','',''];
        return (
          <Alert variant={msg.type}>
            <ul>
              { msg.messages.map((message, id) => <li key={id}>{message}</li>) }
            </ul>
          </Alert>
        );       
      }
  }

  render() {
    return (
      <Col md={{span: 8, offset: 2}}>
        <Jumbotron className="sign-up-form">
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

            <Form.Group controlId="formBasicPasswordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password Confirmation"
                ref={this.passConfirmRef}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {this.signUpResult()}
        </Jumbotron>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    signUpMessage: state.user.data.signUpMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);