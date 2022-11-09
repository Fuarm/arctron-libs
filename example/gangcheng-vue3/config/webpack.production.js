const TerserPlugin = require('terser-webpack-plugin')
const os = require('os')
const { join, resolve } = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// optimize-css-assets-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
				extractComments: false // 不将注释提取到单独文件
			}),
			new CssMinimizerPlugin({
				parallel: os.cpus().length - 1,
			}),
		],
	},
	externals: {
		vue: 'Vue',
		echarts: 'echarts'
	},
	plugins: [
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: true 
		}),
		// new BundleAnalyzerPlugin({analyzerMode: 'static'}),
		new HtmlWebpackPlugin({
			title: '港城 CIM 面板',
			filename: 'index.html',
			template: resolve(__dirname, '../public/index.prod.html'),
			cdn: {
				js: [
					'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.41/vue.global.prod.min.js',
					'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js'
				],
				css: []
			}
		}),

		// webpack service worker
		new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: false
    }),
	],
}
