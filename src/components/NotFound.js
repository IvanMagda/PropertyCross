import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NotFound extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            404, Page not found. Return to <Link to='/'>main</Link>?
          </div>
        </div>
      </div>
    )
  }
}