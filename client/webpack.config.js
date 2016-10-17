const webpack = require('webpack');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = [
  {
    devtool: "source-map",
    entry: [
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'babel-polyfill',
      './app/bundles/HelloWorld/startup/HelloWorldApp',
      './src/stylesheets/application.scss',
    ],
  
    output: {
      filename: 'main-[hash].js',
      path: '../public/assets',
    },
  
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv),
        },
      }),
      new ManifestPlugin(),
      new ExtractTextPlugin("main-[hash].css"),
    ],
    module: {
      loaders: [
        {
          test: require.resolve('react'),
          loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
        },
      ],
    },
  },
];

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
