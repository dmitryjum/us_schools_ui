import React from 'react';
import SchoolList from '../schoolList';
import TopTwentyKeys from '../topTwentyKeys';
import SearchSchool from '../SearchSchool';
import './index.css';
import { Row, Col} from 'react-bootstrap';

function Home() {
  return (
    <>
      <SearchSchool/>
      <Row>
        <Col>
          <TopTwentyKeys/>
        </Col>
        <Col>
          <SchoolList/>
        </Col>
      </Row>
    </>
  );
}

export default Home;

//TODO:
// 3: Create SchoolCard component for each school card
// 6.1: Add React Router
// 7: Make search work either according current API end points,
// or add full text search functionality to api
// 8: Integrate Redux with SchoolList, TopKeys and SchoolSearch
// 9: Create SignUp page and integrate it with Redux
// 10: Create Login page and integrate it with Redux
// 11: Create Add New School Modal
// 12: Create Edit school functionality
// 13: Add more schools to list with button in the bottom
