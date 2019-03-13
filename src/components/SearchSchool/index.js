import React, { Component } from 'react';
import { Jumbotron, InputGroup, FormControl, Button } from 'react-bootstrap'

class SearchSchool extends Component {

  render() {
    return (
      <Jumbotron>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Type a school title or any detail to search by"
            aria-label="Type a school title or any detail to search by"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="info">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Jumbotron>
    );
  }
}

export default SearchSchool;