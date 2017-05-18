'use strict';
/***************************** BEGIN Import Libraries *****************************/
const restify = require('restify');
const fs = require('fs');
const webpack = require('webpack');
const mongoose = require('mongoose');

/***************************** BEGIN local helpers *****************************/
const indexPath = '/../app/index.html';
const config = require('../config/config');
const webpackConfig = require('../webpack.config');
/***************************** BEGIN main variables *****************************/
const compiler = webpack(webpackConfig);
const server = new restify.createServer();

/***************************** BEGIN Mongoose Configuration *****************************/
mongoose.connect(config.mongo.uri, config.mongo.options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  const seedDB = config.seedDB == "true";
  if(seedDB) require('../config/seed');
  console.log('Successfully connected to mongo.');
});

/***************************** BEGIN server configuration *****************************/
// middleware
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(require("webpack-hot-middleware")(compiler));

// set up static file routes
function serveStatic(req, res) {
  const contentType = req.headers.accept.split(',')[0];
  const path = req.path();
  let filePath = indexPath;
  const paths = new RegExp('' +
    '^\/' +
    '(search' +
    '|add' +
    ')?$'
  );

  console.log('serving static:: ', path);
  if (!paths.test(path)) filePath = '/..' + path;
  // else res.send(404, { status: 0, error: { message: 'path not found' } });

  console.log(__dirname + filePath);

  fs.readFile( __dirname + filePath, function (error, data) {
    if (data) {
      res.writeHead(200, {'Content-Type': contentType, 'Content-Length':data.length});
      res.write(data);
      res.send();
    } else if (error) {
      res.send(error);
    }
  });

}

/** Internal Routes **/
require('./Movie/movie.router.js')(server);

// Set up static routes
server.get({ name: 'static', path: /.+?\.(js|html|css|png|ico)/ }, serveStatic);
server.get({ name: 'index', path: /^\/(?!api)(?!internal).*/ }, serveStatic);


// start up server
const port = 9091;
server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// expose server
module.exports = server;
