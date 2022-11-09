
const chalk = require('chalk');
const internalIp = require('internal-ip');
const { join, resolve } = require('path')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const logo = join(__dirname, 'icon.png')
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const notifier = require('node-notifier')
const webpack = require('webpack')

const port = 3000

module.exports = {
	devServer: {
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:' + port,
		},
		static: {
			directory: join(__dirname, '../dist'),
		},
		hot: true,
		port,
	},
	output: {
		publicPath: '/',
		filename: 'scripts/[name].bundle.js',
		assetModuleFilename: 'images/[name].[ext]',
	},
	stats: 'errors-only',
	devtool: false,
	plugins: [
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false 
		}),
		// new WebpackBuildNotifierPlugin({
		//   title: '💿 ',
		//   logo,
		//   suppressSuccess: true,
		// }),
		new HtmlWebpackPlugin({
			title: '开发：港城 CIM 面板',
			filename: 'index.html',
			template: resolve(__dirname, '../public/index.dev.html'),
		}),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				// messages: ['You application is running here http://localhost:' + port],
				messages: [
          `App running at:
          - Local:     ${chalk.cyan.underline(`http://localhost:${port}/`)}
          - Network:   ${chalk.cyan.underline(`http://${internalIp.v4.sync()}:${port}/`)}`,
        ],
				notes: ['💊 构建信息请及时关注窗口提示'],
			},
			onErrors: function (severity, errors) {
				if (severity !== 'error') {
					return
				}
				const error = errors[0]
				notifier.notify({
					title: '👒 Webpack构建失败',
					message: severity + ': ' + error.name,
					subtitle: error.file || '',
					icon: join(__dirname, 'icon.png'),
				})
			},
			clearConsole: true,
		}),
		new webpack.SourceMapDevToolPlugin({ exclude: '/node_modules/*' }),
	],
}
