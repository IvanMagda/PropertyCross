import React, { Component } from 'react'
import { Image } from 'react-bootstrap';

export default class PropertyListing extends Component {
  render() {
    return (
      <div className='row'>
        <div className='row'>
          <h4 className='text-left col-md-12'>{this.props.data.price_formatted}</h4>
        </div>
        <div className='row'>
          <h4 className='text-left col-md-12'>{this.props.data.title}</h4>
        </div>
        <div className='row'>
          <Image className='center-block' src={this.props.data.img_url} responsive />
        </div>
        <div className='row center-block'>
          <p>{this.props.data.bedroom_number} bed, {this.props.data.bathroom_number} bathrooms</p>
          <p>{this.props.data.summary}</p>
        </div>
      </div>
    )
  }
}