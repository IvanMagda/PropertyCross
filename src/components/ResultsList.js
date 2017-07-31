import React, { Component } from 'react'
import { Media } from 'react-bootstrap';
import { Link } from 'react-router'

export default class ResultsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var itemTemplate = this.props.data.searchResult.map(function (item, index) {
            return (
                <Media key={index} >
                    <Media.Left>
                        <Link to={this.props.data.route + '/' + index} ><img width={100} height={100} src={item.img_url} alt='Image' /></Link>
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>{item.price_formatted}</Media.Heading>
                        <p>{item.summary}</p>
                    </Media.Body>
                </Media>
            )
        }, this);

        return (
            <div className='row'>
                <div className='col-md-6 col-md-offset-3'>
                    {itemTemplate}
                </div>
            </div>
        )
    }
}