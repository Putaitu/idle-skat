'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require('es6-promise').polyfill();

module.exports = {
  entry: './src/index.js',

  output: {
    path: __dirname,
    filename: 'js/app.js'
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin('css/app.css'),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'raw-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
