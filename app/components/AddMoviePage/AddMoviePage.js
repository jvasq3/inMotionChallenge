'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import Header from 'components/HomePage/Header';
import Input from 'components/Input';
import AddActors from './AddActors';
import Dictionary from '../../constants/Dictionary';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';

import MovieActions from 'actions/MovieActions';
import MovieStore from 'stores/MovieStore';
import ActionTypes from 'constants/ActionTypes';

class AddMoviePage extends Component {

  constructor() {
    super();
    this.state = {
      rating: '',
      year: '',
      title: '',
      actors: [],
      genre: ''
    }

    this._updateState = this._updateState.bind(this);
    this._submitMovie = this._submitMovie.bind(this);
    this._routeToHome = this._routeToHome.bind(this);
  }

  componentWillMount() {
    MovieStore.addChangeListener(ActionTypes.CREATE_MOVIE, this._routeToHome);

  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(ActionTypes.CREATE_MOVIE, this._routeToHome);
  }

  _updateState(key, value){
    //TODO validation
    this.setState({[key] : value});
  }

  _submitMovie(){
    console.log('submitting')
    const movie = this.state;
    MovieActions.createMovie(movie)
  }

  _routeToHome(){
    browserHistory.push('/');
  }
/*

 */
  render() {
    console.log('state', this.state);

    const submitButton = (
      <Button name='Submit' onClick={() => {this._submitMovie()}}/>
    )

    return (
      <div className='addMovie-container'>
        <Header/>
        <div className='addMovie-input-container'>
          <div className='row'>
            <Input defaultValue={this.state.title}
              labelName='Title'
              addClasses='col-xs-4'
              onBlur={e => {this._updateState('title', e.target.value)}}/>
              <Input defaultValue={this.state.title}
                labelName='Year'
                type='text'
                maxLength='4'
                addClasses='col-xs-3'
                onBlur={e => {this._updateState('year', e.target.value)}}/>
                <Dropdown onChange={e => {this._updateState('genre', e.target.value)}}
                  addClasses='col-xs-4'
                  options={Dictionary.genres}
                  labelName='Genre'
                  defaultValue={this.state.genre}/>
          </div>
          <div className='row'>
            <Dropdown onChange={e => {this._updateState('rating', e.target.value)}}
                      addClasses='col-xs-4'
                      options={Dictionary.ratings}
                      labelName='Rating'
                      defaultValue={this.state.rating}/>
          </div>
          <div className='row'>
            <AddActors addClasses='addActors' actors={this.state.actors}
                setActors={this._updateState} />
          </div>
        </div>
        {submitButton}
      </div>
    );
  }
}

module.exports = AddMoviePage;
