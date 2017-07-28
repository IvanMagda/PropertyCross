import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import Search from './containers/Search'
import Favorites from './containers/Favorites'
import Listing from './containers/Listing'
import ResultsList from './components/ResultsList'
import PropertyListing from './components/PropertyListing'
import LastSearch from './components/LastSearch'
import Locations from './components/Locations'
import NotFound from './components/NotFound'

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={LastSearch} />
      <Route path='locations' component={Locations} />
    </Route>
    <Route path='/search' component={Search}>
      <IndexRoute component={ResultsList} />
    </Route>
    <Route path='/search/:id' component={Listing}>
      <IndexRoute component={PropertyListing} />
    </Route>
    <Route path='/favorites' component={Favorites}>
      <IndexRoute component={ResultsList} />
    </Route>
    <Route path='/favorites/:id' component={Listing}>
      <IndexRoute component={PropertyListing} />
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)