import React, { Component } from 'react';
import { Form, Button, Jumbotron, Col } from 'react-bootstrap';
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
    this.signUpSuccess = this.signUpSuccess.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.actions.signUp({
      'email': this.emailRef.current.value,
      'password': this.passwordRef.current.value,
      'password_confirmation': this.passConfirmRef.current.value
    });
  }

  signUpSuccess() {
    if (this.props.signUpMessage !== '') {
      return (
        <div className="alert alert-success" role="alert">
          User has been successfuly created
        </div>
      )
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
          {this.signUpSuccess()}
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