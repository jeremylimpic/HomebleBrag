const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require('dotenv').config();

module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist/',
        filename: 'app-[hash].min.js',
        pathinfo: true,
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract([
                    'css?sourceMap',
                    'sass?sourceMap&outputStyle=compressed',
                ]),
            },
            {
                test: /\.(jpg|png|gif|mp4|otf|svg)$/,
                loader: 'url?limit=20000',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.AWS_BUCKET': JSON.stringify(process.env.AWS_BUCKET),
            'process.env.API_GW_ADDRESS': JSON.stringify(process.env.API_GW_ADDRESS),
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: false,
            minify: { collapseWhitespace: true },
        }),
        new ExtractTextPlugin("style-[hash].css"),
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: '_',
    },
    devtool: process.env.NODE_ENV === 'production' ? null : 'source-map',
};
