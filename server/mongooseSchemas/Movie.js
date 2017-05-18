'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  genre: {
    type: String,
    default: ''
  },

  actors: {
    type: Array,
    default: []
  },

  title: {
    type: String,
    default: ''
  },

  year: {
    type: String,
    default: ''
  },

  rating: {
    type: String,
    default: ''
  }
}, {
  collection: 'movies'
});

MovieSchema.index({genre: 'text', actors: 'text', title: 'text', year: 'text'}, {
     weights: {
       genre: 2,
       actors: 5,
       title: 10,
       year: 2
     }})
const Movie = mongoose.model('Movie', MovieSchema);


module.exports = Movie;
