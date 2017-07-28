import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { FormControl } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import Store from '../middleware/store'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
  }

  onBtnClickHandler() {
    Store.searchText = ReactDOM.findDOMNode(this.refs.searchInput).value;
  }

  render() {
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
          />
          <p></p>
        </div>
        <div className='row'>
          <ButtonToolbar>
            <Link to='/search' className='btn btn-md btn-primary' onClick={this.onBtnClickHandler}>Go</Link>
            <Link to='/locations' className='btn btn-md btn-default'>My location</Link>
          </ButtonToolbar>
        </div>
        {this.props.children}
      </div>
    )
  }
}