const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/dist');
const APP_DIR = path.resolve(__dirname, 'src/client/src');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/client/src/index.html',
  filename: 'index.html',
  inject: 'body'
})

const config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    resolve: {
      modules: [APP_DIR, "node_modules"],
      extensions: ['.js', '.jsx']
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                exclude: ["/node_modules/"],
                loader : 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
 };

 module.exports = config;