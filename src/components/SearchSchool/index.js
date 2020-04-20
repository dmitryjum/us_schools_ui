import React, { useRef } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { search } from "../../actions/schoolList";
import { openModal } from "../../actions/schoolModal";
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

const SearchSchool = () => {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.data.isAuthenticated);

  const handleClick = () => {
    dispatch(search({ term: searchRef.current.value}))
  }

  function newSchoolButton() {
    if (!isAuthenticated) return null;
    return <Button variant="outline-warning" onClick={() => dispatch(openModal())}>New School</Button>
  }

  return (
    <InputGroup>
      <FormControl
        placeholder="Type a school title or any detail to search by"
        aria-label="Type a school title or any detail to search by"
        aria-describedby="basic-addon2"
        ref={searchRef}
      />
        <Button variant="outline-info" onClick={handleClick}>
          Search</Button>
        {newSchoolButton()}
    </InputGroup>
  );
}

export default SearchSchool;