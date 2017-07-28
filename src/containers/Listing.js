import React, { Component } from 'react'
import Store from '../middleware/store'
import { Button } from 'react-bootstrap';
import PropertyListing from '../components/PropertyListing'

export default class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.addToFavorites = this.addToFavorites.bind(this);
        this.safeAdd = this.safeAdd.bind(this);
    }

    addToFavorites() {
        const item_object = JSON.stringify(Store.searchItem[this.props.params.id]);
        console.log('add to favor');
        console.log(item_object);
        if (item_object !== 'undefined') {
            if (localStorage.getItem('favorites')) {
                localStorage.setItem('favorites', this.safeAdd(item_object));
            } else {
                localStorage.setItem('favorites', item_object);
            }
        }
    }

    safeAdd(item_object) {
        var favorites = localStorage.getItem('favorites');
        var favorArray = favorites.split('},{');
        var rezult = favorites.concat('},{' + item_object);

        favorArray.forEach(function (e) {
            if (e == item_object) {
                rezult = favorites;
            }
        });

        return rezult;
    }

    componentDidMount() {
        if (this.props.route.path == '/search/:id') {
            this.setState({ data: Store.searchItem[this.props.params.id] });
            console.log(Store.searchItem[this.props.params.id]);
        } else {
            this.setState({ data: JSON.parse(localStorage.getItem('favorites').split('},{')[this.props.params.id]) });
        }
    }

    render() {
        return (<div className='container'>
            <div className='row'>
                <h3 className='text-center col-md-12'>Property Details
            <Button className='pull-right' onClick={this.addToFavorites}>+</Button>
                </h3>
            </div>
            <PropertyListing data={this.state.data} />
        </div>)
    }
}