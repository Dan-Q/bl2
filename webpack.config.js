var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var OnlyIfChangedPlugin = require('only-if-changed-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
  devServer: {
    host: "0.0.0.0",
    port: 8079
  },
  plugins: [
    new OnlyIfChangedPlugin({
      cacheDirectory: path.join(process.cwd(), 'tmp'),
      cacheIdentifier: 'dev'
    }),
    new BrowserSyncPlugin({
      host: '0.0.0.0',
      port: 8080,
      proxy: 'http://localhost:8079/',
      files: ["bodlanes2.css", "examples/**/*", "presentations/**/*"],
      watchEvents: ["add", "change"],
      serveStatic: ["examples", "presentations"],
      browser: "chrome",
      notify: false
    })
  ]
};
