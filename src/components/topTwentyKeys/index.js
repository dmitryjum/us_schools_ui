import React, { Component } from 'react';
import USUApi from '../../utils/api';

class TopTwentyKeys extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keys: {}
    }
  }

  async componentDidMount() {
    const response = await USUApi.getTopTwentyKeys();
    this.setState({keys: response.data})
  }

  render() {
    return (
      <>
        <h3>Top 20 detail keys to search schools by</h3>
        <ul>
          {
            Object.entries(this.state.keys).map(([k,v]) => <li key={k}>{k}, apears times: {v}</li>)
          }
        </ul>
      </>
    );
  }
}

export default TopTwentyKeys;