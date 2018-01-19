var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var OnlyIfChangedPlugin = require('only-if-changed-webpack-plugin');

// ensure ./tmp exists
if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");

module.exports = {
  entry: [
    'babel-polyfill',
    './src/bodlanes2'
  ],
  output: {
      publicPath: '/',
      filename: 'bodlanes2.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      { 
        test: /\.less$/,
        loader: "style!css!autoprefixer!less"
      },
    ]
  },
  plugins: [
    new OnlyIfChangedPlugin({
      cacheDirectory: path.join(process.cwd(), 'tmp'),
      cacheIdentifier: 'dev'
    })
  ]
};
