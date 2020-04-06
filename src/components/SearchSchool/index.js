import React, { Component } from 'react';
import { Jumbotron, InputGroup, FormControl, Button } from 'react-bootstrap'

class SearchSchool extends Component {
  constructor(props) {
    super(props)
    this.searchRef = React.createRef();
  }

  handleClick(){
    this.props.search({term: this.searchRef.current.value})
  }

  render() {
    return (
      <Jumbotron>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Type a school title or any detail to search by"
            aria-label="Type a school title or any detail to search by"
            aria-describedby="basic-addon2"
            ref={this.searchRef}
          />
          <InputGroup.Append>
            <Button variant="info" onClick={() => this.handleClick()}>
              Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Jumbotron>
    );
  }
}

export default SearchSchool;