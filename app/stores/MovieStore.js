import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

const EventEmitter = require('events').EventEmitter;
const CHANGE_EVENT = 'change';

let _movies = [],
  _activeMovie= {},
  _queriedMovies = [];

const MovieStore = Object.assign({}, EventEmitter.prototype, {

  addChangeListener: function(event, callback){
    this.on(event, callback);
  },

  removeChangeListener: function(event, callback) {
    this.removeListener(event, callback);
  },

  emitChange: function(event){
    this.emit(event);
  },

  setMovies: function(movies){
    _movies = movies;
  },

  getMovies: function(){
    return _movies;
  },

  setActiveMovie: function(movie){
    _activeMovie = movie;
  },

  getActiveMovie: function(){
    return _activeMovie;
  },

  setQueriedMovies: function(movies){
    _queriedMovies = movies;
  },

  getQueriedMovies: function(){
    return _queriedMovies;
  },

  setActiveMovie: function(id){
    _activeMovie = id;
  },

  getActiveMovie: function(){
    return _activeMovie;
  }

});

Dispatcher.register( action => {
  switch(action.actionType) {
    case ActionTypes.GET_MOVIES:
      MovieStore.setMovies(action.data);
      MovieStore.emitChange(ActionTypes.GET_MOVIES);
      break;
    case ActionTypes.SET_ACTIVE_MOVIE:
      MovieStore.setActiveMovie(action.data);
      MovieStore.emitChange();
      break;
    case ActionTypes.QUERY_MOVIES:
      MovieStore.setQueriedMovies(action.data);
      MovieStore.emitChange(ActionTypes.QUERY_MOVIES);
      break;
    case ActionTypes.SET_ACTIVE_MOVIE:
      MovieStore.setActiveMovie(action.data);
      MovieStore.emitChange(ActionTypes.SET_ACTIVE_MOVIE);
      break;
    case ActionTypes.DELETE_MOVIE:
      MovieStore.emitChange(ActionTypes.DELETE_MOVIE);
      break;
    case ActionTypes.CREATE_MOVIE:
      console.log('created movie', action.data)
      MovieStore.emitChange(ActionTypes.CREATE_MOVIE);
    default:
      break;

  }
});

export default MovieStore;
