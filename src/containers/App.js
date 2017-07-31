import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import $ from 'jquery'
import { Link } from 'react-router'
import { FormControl } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import * as st from '../middleware/store'
import * as core from '../middleware/core';
import { browserHistory } from 'react-router'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.onSearchBtnClickHandler = this.onSearchBtnClickHandler.bind(this);
    this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onLocationPressed = this.onLocationPressed.bind(this);
    this.handleLocations = this.handleLocations.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      searchTextIsEmpty: true,
      message: '',
      locations: [],
      isLoading: false
    };
  }

  onSearchBtnClickHandler(e) {
    if (!this.state.searchTextIsEmpty) {
      e.preventDefault();
      this.setState({ isLoading: true })
      st.Store('searchText', ReactDOM.findDOMNode(this.refs.searchInput).value);
      st.Store('searchKey', 'place_name');
      let query = core.urlForQueryAndPage(st.Store('searchKey'), st.Store('searchText'), 1);
      core.load(query, this.handleSearch, this.handleError);
    } else {
      e.preventDefault();
    }
  }

  handleEnterKeyPress(e) {
    if (e.key == 'Enter') {
      this.onSearchBtnClickHandler(e);
    }
  }

  onSearchTextChange(e) {
    let text = e.target.value;
    if (text.trim().length > 0) {
      this.setState({ searchTextIsEmpty: false })
    } else {
      this.setState({ searchTextIsEmpty: true })
    }
  }

  onLocationPressed() {
    this.setState({ isLoading: true })
    navigator.geolocation.getCurrentPosition(
      location => {
        let search = location.coords.latitude + ',' + location.coords.longitude;
        if(ReactDOM.findDOMNode(this.refs.searchInput).value === 'testLocation'){search = '51.684183,-3.431481';}
        st.Store('searchKey', 'centre_point');
        st.Store('searchText', search);
        let query = core.urlForQueryAndPage(st.Store('searchKey'), st.Store('searchText'), 1);
        core.load(query, this.handleLocations, this.handleError);
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your location: ' + error
        });
      });
  }

  handleLocations(data) {
    st.Store('locationsMessage', 'There was a problem with obtaining your location: ' + data.response.application_response_text);
    st.Store('locations', data.response.locations);
    this.setState({
      message: st.Store('locationsMessage'),
      locations: st.Store('locations'),
      isLoading: false
    });
  }

  handleSearch(data) {
    st.Store('page', data.request.page);
    st.Store('matches', data.response.total_results || 0);
    st.addLastSearch(st.Store('searchText'));
    st.addLastSearchData(data, st.Store('lastSearches')[st.Store('lastSearches').length-1].timeStamp);
    st.Store('time', st.Store('lastSearches')[st.Store('lastSearches').length-1].timeStamp);
    st.Store('searchResult', data.response.listings);
    this.setState({ isLoading: false });
    if (data.response.listings.length == 0) {
      browserHistory.push('/error')
    } else {
      browserHistory.push('/search')
    }
  }

  handleError(err) {
    this.setState({ isLoading: false });
    browserHistory.push('/error')
    console.log(err)
  }

  render() {
    let template;

    if (this.state.isLoading) {
      template = <img className='spinner' src='src/css/marvin-spinner.gif' />
    } else {
      template = this.props.children
    }

    return (
      <div className='container'>
        <div className='row'>
          <h3 className='text-center col-md-12'>PropertyCross
            <Link to='/favorites' className='btn btn-md btn-info pull-right'>Faves</Link>
          </h3>
        </div>
        <div className='row'>
          <p>Use the form below to search for houses to buy.
            You can search by place-name, postcode, or click
            'My location', to search in your current location!</p>
        </div>
        <div className='row'>
          <FormControl
            type='text'
            placeholder='newcastle'
            defaultValue=''
            ref='searchInput'
            onChange={this.onSearchTextChange}
            onKeyPress={this.handleEnterKeyPress}
          />
          <p></p>
        </div>
        <div className='row'>
          <ButtonToolbar>
            <Link to='/search' className='btn btn-md btn-primary' onClick={this.onSearchBtnClickHandler} disabled={this.state.searchTextIsEmpty}>Go</Link>
            <Link to='/locations' className='btn btn-md btn-default' onClick={this.onLocationPressed}>My location</Link>
          </ButtonToolbar>
        </div>
        {template}
      </div>
    )
  }
}