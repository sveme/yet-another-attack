var path = require("path");
// returns compiled css code from file.scss, resolves Sass imports
var dir_js = path.resolve(__dirname, 'src/js');
var dir_html = path.resolve(__dirname, '.');
var dir_build = path.resolve(__dirname, '.');

module.exports = {
    entry: path.resolve(dir_js, 'main.js'),
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                include: [
                  path.resolve(__dirname, "src/js"),
                ],
                test: /\.js?$/,
                query: {
                  presets:["es2015", "es2017"],
                }
            },
        ]
    },
    plugins: [
        // Simply copies the files over
        // new CopyWebpackPlugin([
        //     { from: dir_html } // to: output.path
        // ]),
    ],
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
    devServer: {
        contentBase: dir_build,
    },
};
