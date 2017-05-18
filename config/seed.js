/**
 * Created by jvasquez3Clutch on 10/20/2016.
 */
/* jshint node: true */
/* jshint esversion: 6 */

'use strict';
var Movie = require('../server/mongooseSchemas/Movie');

/**
 * Seed database with movies
 */
Movie.find({}).remove(function() {
  Movie.create({
      genre: 'Drama',
      actors: ['Al Pacino', 'James Caan', 'Marlon Brando'],
      title: 'The Godfather',
      year: '1972',
      rating: '9'
    },
    {
      "_id": "591b5706a51e5f805f443a08",
      "rating": "9",
      "year": "2002",
      "title": "Catch Me If You Can",
      "actors": [
        "Leonardo DiCaprio",
        "Tom Hanks"
      ],
      "genre": "Drama"
    },
    {
      "rating": "9",
      "year": "1992",
      "title": "The Titanic",
      "actors": [
        "Leonardo DiCaprio",
        "Kate Winslet"
      ],
      "genre": "Drama"
    },
    function() {
      console.log('finished populating movies');
    }
  );
});
