import React, { Component } from 'react'
import ResultsList from '../components/ResultsList'
import * as st from '../middleware/store'

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResult: [], route: '' };
  }

  componentDidMount() {
    this.setState({ searchResult: st.Store('favorites') || [], route: this.props.route.path });
    st.Store('searchResult', st.Store('favorites'));
    console.log(this.state.data);
    console.log(this.state.searchResult);
  }

  render() {
    let template;

    if (this.state.searchResult.length > 0) {
      template = (
        <div className='container' ref='searchRes'>
          <div className='row'>
            <h3 className='col-md-12 text-center'> </h3>
          </div>
          <ResultsList data={this.state} />
        </div>
      )
    } else {
      template = <h2>No Favorites</h2>
    }

    return template;
  }
}