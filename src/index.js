import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { routes } from './routes'
import { Router, browserHistory } from 'react-router'

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('root')
)