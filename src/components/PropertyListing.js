import React, { Component } from 'react'
import { Image } from 'react-bootstrap';

export default class PropertyListing extends Component {
  render() {
    return (
      <div className='row'>
        <div className='row'>
          <h2 className='text-left col-md-12'>{this.props.data.price_formatted}</h2>
        </div>
        <div className='row'>
          <h2 className='text-left col-md-12'>{this.props.data.title}</h2>
        </div>
        <div className='row'>
          <Image src={this.props.data.img_url} responsive />
        </div>
        <div className='row'>
          <p>{this.props.data.bedroom_number} bed, {this.props.data.bathroom_number} bathrooms</p>
          <p>{this.props.data.summary}</p>
        </div>
      </div>
    )
  }
}