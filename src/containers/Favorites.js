import React, { Component } from 'react'
import ResultsList from '../components/ResultsList'

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], route:'' };
  }

  componentDidMount() {
    var local = [];
    console.log(localStorage.getItem('favorites'));
    localStorage.getItem('favorites').split('},{').forEach(function (e) {
      console.log(JSON.parse(e));
      local.push(JSON.parse(e));
    });
    this.setState({ data: local , route: this.props.route.path});
    //console.log(JSON.parse(localStorage.getItem('favorites').split('},{')));
    console.log(this.state.data);
    console.log(local);
  }

  render() {
    let template;

    template = (
      <div className='container' ref='searchRes'>
        <div className='row'>
          <h3 className='col-md-12 text-center'>20 of 50 matches</h3>
        </div>
        <ResultsList data={this.state} />
      </div>
    )

    return template;
  }
}