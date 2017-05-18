'use strict';

const restify = require('restify');
const MovieCtrl = require('./movie.controller');


const MOVIE_CREATE_PATH = require('../constants/RouteConstants').MOVIE_CREATE_PATH;
const MOVIE_DESTROY_PATH = require('../constants/RouteConstants').MOVIE_DESTROY_PATH;
const MOVIE_GET_PATH = require('../constants/RouteConstants').MOVIE_GET_PATH;
const MOVIE_QUERY_PATH = require('../constants/RouteConstants').MOVIE_QUERY_PATH;


module.exports = (server) => {

  server.get(MOVIE_GET_PATH, MovieCtrl.read);
  server.post(MOVIE_CREATE_PATH, MovieCtrl.create);
  server.post(MOVIE_DESTROY_PATH, MovieCtrl.destroy);
  server.get(MOVIE_QUERY_PATH, MovieCtrl.query);

};
