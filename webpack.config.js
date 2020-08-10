const path = require('path');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let buildconfig = {
    entry: "./src/app.js",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        writeToDisk: true,
        hot: true,
        watchOptions: {
            poll: true
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true, plugins: [require('autoprefixer')] } },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            implementation: require("sass"),
                            sassOptions: { outputStyle: 'compressed' }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    },
                },
                    { loader: 'image-webpack-loader' }
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    inline: false,
                    annotation: true
                }
            }
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
};

if (process.env.GXY_BUILD_SOURCEMAPS || process.env.NODE_ENV == "development") {
    buildconfig.devtool = "source-map";
}

module.exports = buildconfig;
