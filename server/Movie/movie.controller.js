'use strict';

const MovieModel = require('../mongooseSchemas/Movie');
const ObjectId = require('mongoose').Types.ObjectId;
const deepQuerySearch = require('../utils/mongo.utils').deepQuerySearch;

class MovieCtrl {

  create(req, res) {
    if(Object.keys(req.body).length !== 5){
      return res.send(400, {status: 0, error: 'Not all fields are completed'})
    }

    return MovieModel.find({title: {$regex: req.body.title, $options:'$i'}}, function(err, movies){
      if(movies.length)
        return res.send(400, {status: 0, error: 'Movie already exists'})
      else{
        return MovieModel.create(req.body, function(err, newMovie){
          if(err)
            return _validationError(res, err)
          return res.send(200, {status: 1, data: newMovie});
        })
      }
    })

  }

  read(req, res) {
    MovieModel.find({}, '-__v',{sort: {title: 1}},  function(err, movies){
      return res.send(200, {status: 1, data:  movies});
    })
  }

  destroy(req, res){
    const id = req.params.id;
    console.log("id::", id);

    MovieModel.findByIdAndRemove(ObjectId(id), function(err, movie){
      console.log('movie')
      if(err)
        return _validationError(res, err);
      return res.send(200, {status: 1, message: 'Successfully removed movie'});
    })
  }

  query(req, res){
    const query = req.query.query;

    const callback = function(err, movies){
      console.log('movies:', movies)
      if(err)
        return _validationError(res, err);
      if(movies.length > 0)
        return res.send(200, {status: 1, data: movies});
      else
        return res.send(200, {status: 0 , data: []})
    }

    if(query.length === 1 && parseInt(query) > 0){
      MovieModel.find({rating: query}, callback)
    }
    MovieModel.find({ $text : { $search : query} }, callback);

  }

}

function _validationError(res, err) {
  return res.json(422, {status: 0, error: {message: err}});
}


module.exports = new MovieCtrl();
