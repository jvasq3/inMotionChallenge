'use-strict'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import HomePage from 'components/HomePage/HomePage';
import SearchMoviePage from 'components/SearchMoviePage/SearchMoviePage';
import AddMoviePage from 'components/AddMoviePage/AddMoviePage';

require('./master.css');

class App extends Component {

  constructor(props){
    super(props);
  }

  componentWillUnmount(){
  }

  componentWillMount(){

  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const router = <Router history={browserHistory}>
  <Route path='/' component={App}>
    <IndexRoute component={HomePage}></IndexRoute>
      <Route path='/search' component={SearchMoviePage}>
      </Route>
      <Route path='/add' component={AddMoviePage}>
      </Route>
  </Route>
</Router>;

window.onload = function () {
  ReactDOM.render(router, document.getElementById('app'));
};

module.exports = App;
