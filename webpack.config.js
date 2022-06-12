const path = require("path");
const TerserPlugin= require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
        clean:true
    },
    devtool: "source-map", //build한 파일과 원본파일을 연결시켜줌
    mode: "development", //production과 development가 있음
    devServer: {
        host:"localhost",
        port:8080,
        open:true,
        watchFiles: './src/index.html'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "First React App",
            template: "./src/index.html",
            inject: "body",
            favicon: "./src/favicon.ico"
        }),
        new MiniCssExtractPlugin({filename:"style.css"})
    ],
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    }
}