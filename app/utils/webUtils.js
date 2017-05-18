'use strict'
import request from 'superagent';
import APIRoutes from '../constants/APIRoutes.js';

const GET_MOVIES = APIRoutes.GET_MOVIES;
const QUERY_MOVIES = APIRoutes.QUERY_MOVIES;
const CREATE_MOVIE = APIRoutes.CREATE_MOVIE;
const DELETE_MOVIE = APIRoutes.DELETE_MOVIE;

/**
 * @name webUtil
 * @description Contains all calls to external API's as well as helper methods related to API usage.
 *              All asynchronous calls must return promises
 */
class webUtil {
  constructor(){}

  getMovies(){
    const options = {
      url: GET_MOVIES,
      method: 'GET',
      headers:{
        'Accept': 'application/json'
      },
    };
    return _callAPI(options);
  }


  queryMovies(query){
    const options = {
      url: QUERY_MOVIES + '?query=' + encodeURIComponent(query),
      method: 'GET',
      headers:{
        'Accept': 'application/json'
      },
    };
    return _callAPI(options);
  }

  createMovie(movie){
    const options = {
      url: CREATE_MOVIE,
      method: 'POST',
      headers:{
        'Accept': 'application/json'
      },
      json: movie
    };
    return _callAPI(options);
  }

  deleteMovie(id){
    const options = {
      url: DELETE_MOVIE + `/${id}`,
      method: 'POST',
      headers:{
        'Accept': 'application/json'
      },
    };
    return _callAPI(options);
  }

}

function _handleResponse(resolve, reject){
  return (err, response) => {
    if (err) return reject(err);
    resolve(response.body);
  };
}

function _callAPI(options){
  console.log("calling the API: ", options);

  return new Promise((resolve, reject) => {
      request(options.method, options.url)
        .set(options.headers)
        .query(options.query)
        .send(options.json)
        .end(_handleResponse(resolve,reject));
    });
}

export default new webUtil();
