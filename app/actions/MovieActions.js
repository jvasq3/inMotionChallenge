import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import webUtils from '../utils/webUtils.js';

const MovieActions = {
  getMovies: function () {

    webUtils.getMovies()
      .then( result => {
        if(result.status === 1 && result.data.length > 0){
          Dispatcher.dispatch({
            actionType: ActionTypes.GET_MOVIES,
            data: result.data
          });
        }

      })
      .catch(err => {
        console.log('get movies err::',err)
        //dispatch action for error
      });
  },

  setActiveMovie: function(id){
    Dispatcher.dispatch({
      actionType: ActionTypes.SET_ACTIVE_MOVIE,
      data: id
    })
  },

  queryMovies: function (query) {
    const encodedQuery = encodeURIComponent(query);
    webUtils.queryMovies(encodedQuery)
      .then( result => {
        console.log('query result::', result);
        if(result.data.length > 0){
          Dispatcher.dispatch({
            actionType: ActionTypes.QUERY_MOVIES,
            data: result.data
          })
        }

      })
      .catch(err => {
        console.log('get movies err::',err)
        //dispatch action for error
      });
  },

  createMovie: function (movie) {

    return webUtils.createMovie(movie)
      .then( result => {
        console.log('create result::', result);
          if(result.data._id){
            Dispatcher.dispatch({
              actionType: ActionTypes.CREATE_MOVIE,
              data: result.data
            })
          }

      })
      .catch(err => {
        console.log('create movies err::',err)
        //dispatch action for error
      });
  },

  deleteMovie: function (id) {
    return webUtils.deleteMovie(id)
      .then( result => {
        console.log('delete result::', result);
        Dispatcher.dispatch({
          actionType: ActionTypes.DELETE_MOVIE
        })

      })
      .catch(err => {
        console.log('create movies err::',err)
        //dispatch action for error
      });
  }

};

module.exports = MovieActions;
