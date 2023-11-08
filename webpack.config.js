import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

export default {
	mode: 'production',
	entry: './src/index.js',
    output: {
		filename: '[name].[contenthash].js',
        path: path.resolve('dist'),
        publicPath: '/'
	},
    devServer: {
        port: 8080,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/img', to: 'img' }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    }
}

