const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 可以把缓存目录清掉
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader@15时,请确保引入这个插件！
const CopyPlugin = require('copy-webpack-plugin'); // 拷贝静态资源

// 设置别名
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    entry: {
        app: "./src/main.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8085,
        proxy: {
            '/api': {
                target: 'http://localhost:8080', // 代理服务器路径
                pathRewrite: {
                    '^/api': '/gc' // 重写路径
                },
                changeOrigin: true // 是否跨域
            }
        },
        host: '0.0.0.0', // 可以把package.json的--的配置写到这里
        inline: true
        // mode: 'development' 没有这个属性，只能在package.json中配置
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 用 webpack 1 时需用 'vue/dist/vue.common.js'
            '@': resolve('src'),
            '@pages': resolve('src/pages'),
            '@components': resolve('src/components'),
            '@test': resolve('test'),
            '@css': resolve('src/css'),
            '@js': resolve('src/js'),
        }
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader'
        },{
            test: /\.vue$/,
            loader: "vue-loader"
        },{
            test: /\.scss$/,
            use: [
                // MiniCssExtractPlugin.loader,
                'vue-style-loader',
                'css-loader',
                // { // 如果设定范围就用oneOf
                //     loader: 'css-loader',
                //     options: {
                //         modules: true,
                //         // 自定义生成的类名
                //         localIdentName: '[local]_[hash:4]'
                //     }
                // },
                // {
                //     loader: 'px2rem-loader',
                //     // options here
                //     options: {
                //         remUnit: 75,
                //         remPrecision: 8
                //     }
                // },
                'sass-loader'
            ]
        },{
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        },{
            test: /\.(eot|svg|ttf|woff|woff2|bpmn)$/,
            loader: 'file-loader'
        },{
            test: /\.(jpe?g|png|gif|svg|bpmn)$/,
            loader: "url-loader"
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: 'static'
            }
        ])
        // new MiniCssExtractPlugin({
        //     filename: 'style.css'
        // })
    ],
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    }
}
