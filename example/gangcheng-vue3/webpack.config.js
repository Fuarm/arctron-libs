const { resolve } = require('path')
const merge = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const _modeflag = _mode === 'production' ? true : false
const WebpackBar = require('webpackbar')
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin  } = require('vue-loader')
// const { ProvidePlugin } = require('webpack');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const webpackBaseConfig = {
	entry: {
		main: resolve('src/index.tsx'),
	},
	output: {
		path: resolve(process.cwd(), 'dist'),
	},
	cache: {
		type: 'filesystem',
		// cacheDirectory: resolve(__dirname, '.temp'),
	},
	// performance: {
	//   maxAssetSize: 250000, // 最大资源大小250KB
	//   maxEntrypointSize: 250000, // 最大入口资源大小250KB
	//   hints: 'warning', // 超出限制时只给出警告
	// },
	module: {
		rules: [
			{
				test: /\.vue/,
				use: {
					loader: "vue-loader"
				}
			},
			{
				test: /\.(ts|tsx)$/,
				use: {
					loader: 'swc-loader',
				},
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.css$/i,
				include: [resolve(__dirname, 'src'), resolve(__dirname, 'node_modules')],
				use: [
					// MiniCssExtractPlugin.loader,
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
				],
			},
		],
	},
	optimization: {
		runtimeChunk: {
			name: 'runtime',
		},
		splitChunks: {
			chunks: 'all',
			maxAsyncRequests: 3,
			cacheGroups: {},
		},
	},
	resolve: {
		alias: {
			'@': resolve('src'),
		},
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
	},
	plugins: [
		new VueLoaderPlugin(),
		// new NodePolyfillPlugin(),
		new MiniCssExtractPlugin({
			filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
			chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
			ignoreOrder: false,
		}),
		// new ProvidePlugin({
		//   Buffer: ['buffer', 'Buffer'],
		// }),
		new CleanWebpackPlugin(),
		new WebpackBar({
			name: "港城 CIM",
			color: '#2dc9d1'
		}),
		new Dotenv(),
	],
}

module.exports = merge.default(webpackBaseConfig, _mergeConfig)
