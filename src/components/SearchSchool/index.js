import React, { useRef } from 'react';
import { Jumbotron, InputGroup, FormControl, Button } from 'react-bootstrap'
import { search } from "../../actions/schoolList";
import { useDispatch } from 'react-redux';

const SearchSchool = () => {
  const searchRef = useRef(null)
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(search({ term: searchRef.current.value}))
  }

  return (
    <Jumbotron>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Type a school title or any detail to search by"
          aria-label="Type a school title or any detail to search by"
          aria-describedby="basic-addon2"
          ref={searchRef}
        />
        <InputGroup.Append>
          <Button variant="info" onClick={handleClick}>
            Search</Button>
            <Button variant="warning">New School</Button>
        </InputGroup.Append>
      </InputGroup>
    </Jumbotron>
  );
}

export default SearchSchool;