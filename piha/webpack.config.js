'use strict';

const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');


module.exports = {
	context: __dirname,
	entry: {
		build: './src/js/app'
	},
	output: {
		filename: "[name].js",
		path: './public/js'
	},

	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},

	devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js'],
		alias: {
			'vue$': 'vue/dist/vue.js'
		}
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
	      	loader: 'babel-loader',
	      	query: {
	        	presets: ['es2015']
	      	}
		},
		{
		    test: /\.scss$/,
		    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap')
		},
		{
           	test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }]
	},

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new ExtractTextPlugin('../css/styles.css',{allChunks: true})
	]
};