import React, { Component } from 'react'
import * as st from '../middleware/store'
import * as core from '../middleware/core';
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

export default class Locations extends Component {
  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.onLocation = this.onLocation.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      isLoading: false
    };
  }

  onLocation(location) {
    this.setState({ isLoading: true })
    var search = location.center_lat + ',' + location.center_long;
    st.Store('searchKey', 'centre_point');
    st.Store('searchText', search);
    st.Store('locationName', location.title);
    var query = core.urlForQueryAndPage(st.Store('searchKey'), st.Store('searchText'), 1);
    core.load(query, this.handleRedirect, this.handleError);
  }

  handleRedirect(data) {
    st.Store('page', data.request.page);
    st.Store('matches', data.response.total_results);
    st.addLastSearch(st.Store('locationName'));
    st.addLastSearchData(data, st.Store('lastSearches')[st.Store('lastSearches').length-1].timeStamp);
    st.Store('time', st.Store('lastSearches')[st.Store('lastSearches').length-1].timeStamp);
    st.Store('searchResult', data.response.listings);
    browserHistory.push('/search')
  }

  handleError(err) {
    this.setState({ isLoading: false });
    browserHistory.push('/error')
    console.log(err)
  }

  render() {
    let locationsTemplate;
    let header = '';
    let onLocat = this.onLocation;
    let loading = '';

    if (st.Store('locations').length > 0) {
      header = 'Please select a location below:';
      locationsTemplate = st.Store('locations').map(function (item, index) {
        return (
          <div key={index} className='row'>
            <div className='col-md-12'>
              <Link className='col-md-12 text-left' onClick={() => onLocat(item)}>{item.title}</Link>
            </div>
          </div>
        )
      })
    } else {
      locationsTemplate = <p>{st.Store('locationsMessage')}</p>
    }

    if (this.state.isLoading) {
      loading = <img className='spinner' src='src/css/marvin-spinner.gif' />
    }

    return (
      <div>
        <div className='row padder'>
          <div className='col-md-12'>{header}</div>
        </div>
        <div className='row link-holder'>
          {locationsTemplate}
          {loading}
        </div>
      </div>
    )
  }
}