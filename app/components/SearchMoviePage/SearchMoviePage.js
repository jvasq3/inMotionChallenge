'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Header from 'components/HomePage/Header';
import Input from 'components/Input';
import Button from 'components/Button';
import MovieActions from 'actions/MovieActions';
import MovieStore from 'stores/MovieStore';
import ActionTypes from 'constants/ActionTypes';
import Table from 'components/Table';

class SearchMoviePage extends Component {

  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchResults: []
    }

    this._handleDelete = this._handleDelete.bind(this);
    this._searchMovies = this._searchMovies.bind(this);
    this._updateResults = this._updateResults.bind(this);
    this._setActiveMovie = this._setActiveMovie.bind(this);
    this._clearResults = this._clearResults.bind(this);
  }

  componentWillMount() {
    MovieStore.addChangeListener(ActionTypes.QUERY_MOVIES, this._updateResults);
    MovieStore.addChangeListener(ActionTypes.DELETE_MOVIE, this._clearResults);
  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(ActionTypes.QUERY_MOVIES, this._updateResults);
    MovieStore.removeChangeListener(ActionTypes.DELETE_MOVIE, this._clearResults);

  }

  _setActiveMovie(movie){
    console.log('active movie::', movie)
    this.setState({activeMovie: movie._id});
  }

  _updateResults(){
    this.setState({searchResults: MovieStore.getQueriedMovies(), activeMovie: ''});
  }

  _clearResults() {
    this.setState({searchResults: [], activeMovie: ''});
  }

  _handleDelete(){
    if(this.state.activeMovie)
      MovieActions.deleteMovie(this.state.activeMovie);
  }

  _searchMovies(){
    MovieActions.queryMovies(this.state.searchQuery)
  }



  render() {

    const headers = ['Rating', 'Year', 'Title', 'Genre'];

    console.log('state', this.state)
    const searchResults = this.state.searchResults.length > 0 ? (
      <Table addClasses='ListTable'
            rowClick={this._setActiveMovie}
            headers={headers}
            tableData={this.state.searchResults}/>
    ) : null;
    return (
      <div>
        <Header/>
        <div className='row'>
          <Input labelName='' defaultValue={this.state.searchQuery} addClasses='col-xs-6' onChange={(e) => {this.setState({searchQuery: e.target.value})}} />

          <div className='col-xs-6' style={{'display': 'inline-flex'}}>
            <Button name='Search' onClick={this._searchMovies}/>
            <Button name='Delete -' onClick={this._handleDelete}/>
          </div>
        </div>
        <div className='row'>
          {searchResults}
        </div>
      </div>
    );
  }
}

module.exports = SearchMoviePage;
