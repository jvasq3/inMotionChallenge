const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: { path: __dirname, filename: 'build/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      actions: 'app/actions',
      constants: 'app/constants',
      core: 'app/core',
      components: 'app/components',
      stores: 'app/stores'
    },
    extensions: [ '', '.js' ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('build/master.css')
  ]
};
