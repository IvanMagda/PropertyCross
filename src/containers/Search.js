import React, { Component } from 'react'
import ResultsList from '../components/ResultsList'
import $ from 'jquery'
import Store from '../middleware/store'

var urlQuery = {
  'country': 'uk',
  'action': 'search_listings',
  'encoding': 'json',
  'listing_type': 'buy',
  'page': 1,
  'place_name': ''
};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], route:'' };
  }

  componentDidMount() {
    console.log(Store.searchText);
    urlQuery.place_name = Store.searchText;

    $.ajax({
      url: 'https://api.nestoria.co.uk/api' + serialize(urlQuery),
      dataType: 'jsonp',
      cache: false,
      type: 'GET',
      success: function (data) {
        this.setState({ data: data.response.listings, route: this.props.route.path });
        Store.searchItem = data.response.listings;
        console.log(data.response.listings);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(err.toString());
        console.warn(xhr.responseText);
        console.log(status);
      }.bind(this)
    });
  }

  render() {
    let template;

    template = (
      <div className='container' ref='searchRes'>
        <div className='row'>
          <h3 className='col-md-12 text-center'>20 of 207 matches</h3>
        </div>
        <ResultsList data={this.state} />
      </div>
    )

    return template;
  }
}

function serialize(obj) {
  return '?' + Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a }, []).join('&')
}