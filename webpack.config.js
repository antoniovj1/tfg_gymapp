const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const client_id = process.env.CLIENT_ID;
const domain = process.env.DOMAIN;

function getPlugins() {
  let plugins = [];

  if (env === 'production') {
    console.log('WebPack for PRODUCTION');

    plugins.push(new webpack.optimize.ModuleConcatenationPlugin()); // Scope Hoisting

    plugins.push(
      new webpack.DefinePlugin({
        _API_HOST: JSON.stringify('http://localhost:8080')
      })
    );
  } else {
    console.log('WebPack for DEVELOPMENT');

    plugins.push(
      new webpack.DefinePlugin({
        _API_HOST: JSON.stringify('http://localhost:8080')
      })
    );
  }

  plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.CLIENT_ID': "'" + client_id + "'",
      'process.env.DOMAIN': "'" + domain + "'"
    })
  );

  return plugins;
}

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: env === 'production' ? 'production' : 'development',
  devtool: env === 'production' ? 'source-map' : 'eval-source-map',
  entry: path.join(__dirname, '/public/js/client.js'),
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
          ]
        } 
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'client.min.js'
  },
  plugins: getPlugins()
};
