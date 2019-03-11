import React, { Component } from 'react';
import SchoolList from '../schoolList'
import * as constants from '../../constants/env/us_states'
import './index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schools: []
    }
  }

  componentDidMount() {
    fetch(`${constants.US_STATE_UNIVERSITIES_PROD_HOST}/api/v1/schools`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            schools: result
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    return (
      <div className="App">
       <SchoolList schools={this.state.schools} />
      </div>
    );
  }
}

export default App;
