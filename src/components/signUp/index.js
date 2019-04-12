import React, { Component } from 'react';
import { Form, Button, Jumbotron, Col } from 'react-bootstrap';
import "./index.css";

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.passConfirmRef = React.createRef();
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.emailRef.current.value)
    console.log(this.passwordRef.current.value)
    console.log(this.passConfirmRef.current.value)
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
        </Jumbotron>
      </Col>
    );
  }
}

export default SignUp;