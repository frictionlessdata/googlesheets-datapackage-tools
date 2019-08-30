const Path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const src = Path.resolve(__dirname, 'src');
const dest = Path.resolve(__dirname, 'dist');

module.exports = {
  context: __dirname,
  entry: `${src}/index.js`,
  output: {
    filename: `code.gs`,
    path: dest,
    libraryTarget: 'this'
  },
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: `${src}/**/*.html`,
        flatten: true,
        to: dest
      },
      {
        from: `${src}/../appsscript.json`,
        to: dest
      }
    ]),
    new GasPlugin({
      comments: false
    })
  ]
};
