const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const SRC = './src/';
const PUB = path.resolve(__dirname, 'public');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new HTMLWebpackPlugin({
    template: SRC + 'index.html',
    filename: 'index.html',
    minify: false
  }),
  new CleanWebpackPlugin(),
];

if (!devMode) {
  plugins.push(new MiniCssExtractPlugin({
    filename: 'style.css',
  }));
}

module.exports = {
  entry: SRC + 'index.js',
  output: {
    filename: 'bundle.js',
    path: PUB
  },
  devServer: {
    contentBase: PUB,
    historyApiFallback: true,
    host: '192.168.31.8'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions:{
                plugins: [
                  autoprefixer({
                    browsers:['ie >= 8', 'last 4 version']
                  })
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins
}
