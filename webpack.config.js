var debug = process.env.NODE_ENV ==! "production";
var webpack = require('webpack');
var path = require('path');


function getPlugins() {
  var plugins = [];


  if (true) {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(new webpack.DefinePlugin({
      _API_HOST: JSON.stringify("https://infraestructuravirtual.herokuapp.com"),
    }));

    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }));
  }

  else {
    plugins.push(
      new webpack.DefinePlugin({
        _API_HOST: JSON.stringify("http://localhost:8080"),
      }));

    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }));
  }

  return plugins;
}


module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: __dirname + "/public/js/client.js",
  resolve: {
    extensions: ["", ".tsx", ".ts", ".jsx", ".js"]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "client.min.js"
  },
  plugins: getPlugins(),
};
