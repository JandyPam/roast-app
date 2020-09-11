var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {//通过vue-loader来识别以vue结尾的文件
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {//通过vue-loader来识别以vue结尾的文件
                test: /.css$/,
                //css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
                use: [
                    'style-loader',//接受潜在页面内部的style标签的文件。
                    'css-loader'
                ]
            },
            {//处理图片文件
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    },
                ]
            }
        ]
    }
};