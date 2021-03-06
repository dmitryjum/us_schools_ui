import React, { Component } from 'react';
import USUApi from '../../utils/api';
import { ListGroup } from 'react-bootstrap';
import "./index.css";
import { connect } from "react-redux";

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
        <h3>Top detail keys</h3>
        <ListGroup className='top-twenty-container'>
          {
            Object.entries(this.state.keys)
              .map(([k, v]) => (
                <ListGroup.Item className={this.props.filterKey === k && 'selected'} key={k} onClick={(e) => this.handleClick(k, e)}>{k}</ListGroup.Item>)
              )
          }
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filterKey: state.schools.filter.details
  }
}

export default connect(mapStateToProps, null)(TopTwentyKeys);