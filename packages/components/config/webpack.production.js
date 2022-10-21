const TerserPlugin = require('terser-webpack-plugin')
const os = require('os')
const { join, resolve } = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// optimize-css-assets-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
module.exports = {
	output: {
		path: join(__dirname, '../dist'),
		publicPath: './',
		filename: 'scripts/[name].[contenthash:5].bundule.js',
		assetModuleFilename: 'images/[name].[hash:5][ext]',
	},
	optimization: {
		minimize: true,
		minimizer: [
			//esbuild prepack压缩
			new TerserPlugin({
				parallel: os.cpus().length - 1,
			}),
			new CssMinimizerPlugin({
				parallel: os.cpus().length - 1,
			}),
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true 
		}),
		// new HtmlWebpackPlugin({
		// 	title: '港城 CIM 面板',
		// 	filename: 'index.html',
		// 	template: resolve(__dirname, '../public/index.html'),
		// }),
		new MiniCssExtractPlugin(),
	],
}
