const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

const production = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].[chunkhash:3].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(css|sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { url: false } },
                    "postcss-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif|eot|woff|ttf|ico)$/i,
                use: ["file-loader?&name=[hash].[ext]"],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        watchFiles: ['src/**/*'],
        compress: true,
        port: 8080,
    },
    watchOptions: {
        aggregateTimeout: 200
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            title: 'My Website',
            template: "./src/index.pug",
            filename: "./index.html",
            inject: true
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/img", to: "img" },
            ],
        }),
    ],
    mode: production ? 'production' : 'development',
    stats: production ? 'normal' : 'minimal'
};

if (production) {
    config.optimization = {
        minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({
                css: true
            })
        ]
    }

    config.plugins.push(new HTMLInlineCSSWebpackPlugin());
}

module.exports = config;