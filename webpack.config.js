var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV
var client_id = process.env.CLIENT_ID
var domain = process.env.DOMAIN



module.exports = {
  context: path.join(__dirname, "src"),
  devtool: env === 'production' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map',
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


function getPlugins() {
  var plugins = [];

  if (env === 'production') {
    console.log('WebPack for PRODUCTION');

    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());

    plugins.push(new webpack.DefinePlugin({
      _API_HOST: JSON.stringify("http://146.148.24.77"),
    }));

  } else {
    console.log('WebPack for DEVELOPMENT');

    plugins.push(
      new webpack.DefinePlugin({
        _API_HOST: JSON.stringify("http://localhost:8080"),
      }));

  }

  plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
    'process.env.CLIENT_ID': "'"+client_id+"'",
    'process.env.DOMAIN': "'"+domain+"'",
  }));

  return plugins;
}