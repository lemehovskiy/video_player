module.exports = {
    watch: true,
    entry: './src/video_player.es6',
    output: {
        filename: 'build/video_player.js'
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};