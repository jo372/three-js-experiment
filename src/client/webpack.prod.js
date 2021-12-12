const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/client/textures/', to: 'textures' }
            ]
        }),
    ]
});