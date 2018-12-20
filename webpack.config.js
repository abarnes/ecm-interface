// This library allows us to combine paths easily
const path = require('path');


module.exports = {
    target: 'node',
    optimization: {
        minimize: false
    },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'commonjs2',
        filename: '[name].js'
    },
    externals: {
        "fs-mock": "fs-mock",
        // "bluetooth-hci-socket": "bluetooth-hci-socket",
        "serialport": "serialport",
        "bufferutil": "bufferutil",
        "utf-8-validate": "utf-8-validate",
        "xpc-connection": "xpc-connection"
    },
    resolve: {
        extensions: ['.js', '.json', '.node']
    },
    devServer: {
        contentBase: './src',
        publicPath: '/output',
        proxy: {
            '/': {
                target: 'ws://localhost:8888',
                ws: true,
                secure: false
            },
        },
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.node$/,
            //use: 'node-loader'
            loader: "native-ext-loader"
          }
        ]
    },
    node: {
        __dirname: process.env.NODE_ENV !== 'production',
        __filename: process.env.NODE_ENV !== 'production'
    }
};