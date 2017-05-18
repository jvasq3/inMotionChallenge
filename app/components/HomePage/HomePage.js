'use strict'

import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Input from 'components/Input';
import Table from 'components/Table';
import Header from 'components/HomePage/Header';
import MovieActions from 'actions/MovieActions';
import MovieStore from 'stores/MovieStore';
import __ from 'lodash';
import ActionTypes from 'constants/ActionTypes';

class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      activeMove: ''
    }

    this._setMovies = this._setMovies.bind(this);
    this._filterMovies = this._filterMovies.bind(this);
  }

  componentWillMount() {
    MovieStore.addChangeListener(ActionTypes.GET_MOVIES, this._setMovies);
    MovieActions.getMovies();
  }

  componentWillUnmount(){
    MovieStore.removeChangeListener(ActionTypes.GET_MOVIES, this._setMovies)
  }

  _setMovies(){
    this.setState({movies: MovieStore.getMovies()});
  }

  _filterMovies(movies){
    return movies.map(movie => {
      return __.omit(movie, ['_id', 'actors']);
    })
  }

  render() {
  console.log('Movies:: ', this.state.movies)
  const headers = ['Rating', 'Year', 'Title', 'Genre'];
  const movieList = this.state.movies !== [] ? <Table addClasses='ListTable'
        rowClick={() => {}}
        headers={headers}
        tableData={this.state.movies}/> : null;
  return (
      <div className='HomePage-container'>
        <Header/>
        <div className='movieList'>
            {movieList}
        </div>
      </div>
    );
  }
}

function _transformDataForTable(data){
  return data.map(movie => {
    const ret = [];
    Object.keys(movie).map(key => {
      ret.push(movie[key])
    })
    return ret;
  })
}

module.exports = HomePage;
