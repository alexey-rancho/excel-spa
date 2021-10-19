const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
const getBundleName = (ext) => `bundle${isProd ? '.[hash]' : ''}.${ext}`

console.log(isProd, isDev)

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: ['@babel/polyfill', './app.js'],
    output: {
        filename: getBundleName('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@style': path.resolve(__dirname, 'src/style'),
            '@components': path.resolve(__dirname, 'src/components'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // ./src/index.html
            minify: { removeComments: isProd, collapseWhitespace: isProd },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({ filename: getBundleName('css') }),
        new EslintPlugin({
            context: path.resolve(__dirname, 'src'),
        }),
    ],
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 9000,
        hot: isDev,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
}
