import React, { Component } from 'react'
import ResultsList from '../components/ResultsList'
import * as st from '../middleware/store'
import { Button } from 'react-bootstrap';
import * as core from '../middleware/core';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      searchResult: [],
      route: '',
      resultsShown: 0,
      totalResults: 0,
      isLoading: true,
      page: 1,
      message: '',
      time:0
    };
  }

  componentDidMount() {
    this.setState({
      searchResult: st.Store('searchResult'),
      route: this.props.route.path,
      resultsShown: st.Store('searchResult').length,
      totalResults: st.Store('matches'),
      page: st.Store('page'),
      isLoading: false,
      time: st.Store('time')
    });
  }

  handleResponse(data) {
    console.log('handleResponse');
    console.log(data);
    this.setState({
      searchResult: this.state.searchResult.concat(data.response.listings),
      route: this.props.route.path,
      resultsShown: parseInt(data.request.num_res, 10) + parseInt(data.request.offset, 10),
      totalResults: data.response.total_results,
      isLoading: false
    });

    st.addLastSearchData(data, st.Store('time'));
    st.Store('searchResult', this.state.searchResult);
  }

  handleError(err) {
    this.setState({ isLoading: false });
    console.log(err)
    alert(err)
  }

  loadMore() {
    this.setState({ isLoading: true, page: ++this.state.page });
    var query = core.urlForQueryAndPage(st.Store('searchKey'), st.Store('searchText'), this.state.page);
    core.load(query, this.handleResponse, this.handleError);
  }

  render() {
    let template;
    let resultsNumber = this.state.resultsShown;
    let loadButton;



    if (this.state.isLoading) {
      loadButton = <p className='center-block text-center'>Loading...</p>
    } else if (this.state.resultsShown >= this.state.totalResults) {
      resultsNumber = this.state.totalResults;
      loadButton = '';
    } else {
      loadButton = <Button className='center-block' onClick={this.loadMore}>Load More</Button>;
    }


    template = (
      <div className='container' ref='searchRes'>
        <div className='row'>
          <h3 className='col-md-12 text-center'>{resultsNumber} of {this.state.totalResults} matches</h3>
        </div>
        <ResultsList data={this.state} />
        <div className='row'>
          {loadButton}
        </div>
      </div>
    )


    return template;
  }
}