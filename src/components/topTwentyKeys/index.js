import React, { Component } from 'react';
import USUApi from '../../utils/api';
import { Button } from 'react-bootstrap';
import "./index.css";

class TopTwentyKeys extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keys: {}
    }
  }

  handleClick(key) {
    this.props.findByKey({ details: key });
  }
  
  async componentDidMount() {
    const response = await USUApi.getTopTwentyKeys();
    this.setState({keys: response.data})
  }

  render() {
    return (
      <div className='top-twenty-wrapper'>
        <h3>Top 20 detail keys to search schools by</h3>
        <ul className='top-twenty-container'>
          {
            Object.entries(this.state.keys)
              .map(([k, v]) => (
                <li key={k}>
                  <Button variant="link" onClick={(e) => this.handleClick(k, e)}>{k}</Button>, apears times: {v}
                </li>)
              )
          }
        </ul>
      </div>
    );
  }
}

export default TopTwentyKeys;