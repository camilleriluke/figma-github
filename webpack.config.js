import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

module.exports = () => ({
	devtool: 'sourcemap',
	entry: {
		content: './source/content',
		iframe: './source/iframe'
	},
	output: {
		path: path.join(__dirname, 'distribution'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: '*',
				context: 'source',
				ignore: '*.js'
			},
			{
				from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
			}
		])
	],
	optimization: {
		concatenateModules: true,

		// Automatically enabled on prod; keeps it somewhat readable for AMO reviewers
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					mangle: false,
					compress: true,
					output: {
						beautify: false,
						indent_level: 2 // eslint-disable-line camelcase
					}
				}
			})
		]
	}
});
