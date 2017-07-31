import React, { Component } from 'react'
import * as st from '../middleware/store'
//import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

export default class LastSearch extends Component {
  constructor(props) {
    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(item) {
    console.log(item);
    st.Store('page', item.page);
    st.Store('time', item.timeStamp);
    st.Store('matches', item.matches);
    st.Store('searchText', item.title);
    st.Store('searchResult', item.data);
    if (item.data.length == 0) {
      browserHistory.push('/error')
    }else{
      browserHistory.push('/search')
    }
  }

  render() {
    let lastSearchesTemplate;
    let handle = this.handleRedirect;

    if (st.Store('lastSearches')) {
      lastSearchesTemplate = st.Store('lastSearches').reverse().map(function (item, index) {
        return (
          <div key={index} className='row'>
            <div className='col-md-12'>
              <Link className='col-md-12 text-left' onClick={() => handle(item)}>{item.title} #{index + 1}   ({item.data.length})</Link>
            </div>
          </div>
        )
      });
    } else {
      lastSearchesTemplate = <p>No searches, yet ... </p>
    }

    return (
      <div>
        <div className='row padder'>
          <div className='col-md-12'>Recent searches:</div>
        </div>
        <div className='row link-holder'>
          {lastSearchesTemplate}
        </div>
      </div>
    )
  }
}