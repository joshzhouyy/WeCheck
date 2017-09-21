const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/dist');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/client/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const config = {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        APP_DIR + '/app.js',
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                exclude: /node_modules/,
                loader : 'babel-loader'
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
 };

 module.exports = config;