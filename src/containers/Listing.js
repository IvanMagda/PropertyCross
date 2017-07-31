import React, { Component } from 'react'
import * as st from '../middleware/store'
import { Button } from 'react-bootstrap';
import PropertyListing from '../components/PropertyListing'

export default class Listing extends Component {
    constructor(props) {
        super(props);
        this.favoritesActions = this.favoritesActions.bind(this);
        this.state = {
            data: [],
            favorite: false
        };
    }

    favoritesActions() {
        if (!this.state.favorite) {
            this.setState({ favorite: true });
            st.addToStore('favorites', this.state.data);
        } else {
            this.setState({ favorite: false });
            st.removeFromFavorites('favorites', this.state.data);
        }
    }

    componentDidMount() {
        let fav = false;
        if (st.Store('favorites') && st.Store('favorites').findIndex(x => x.thumb_url === st.Store('searchResult')[this.props.params.id].thumb_url) > -1) { fav = true; }
        this.setState({ data: st.Store('searchResult')[this.props.params.id], favorite: fav });
    }

    render() {
        let favoriteButton = <Button className={'pull-right ' + (this.state.favorite == true ? 'btn-success' : '')} onClick={this.favoritesActions} >+</Button>;
        return (<div className='container'>
            <div className='row'>
                <h2 className='text-center col-md-12'>Property Details
                    {favoriteButton}
                </h2>
            </div>
            <PropertyListing data={this.state.data} />
        </div>)
    }
}