import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

export const production = {
    context : path.resolve(__dirname, '..'),
    entry   : {
        app   : [path.resolve(__dirname, '../app/main.js')],
        vendor: ['core-js/shim', 'console-polyfill', 'angular', 'angular-route',
            'angular-cookies', 'angular-sanitize', 'angular-resource',
            'angular-ui-bootstrap', 'angular-ui-router'],
    },
    output  : {
        path      : path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename  : 'bundle.js',
    },
    postcss : [
        autoprefixer({browsers: ['last 2 versions']}),
    ],
    module  : {
        preLoaders: [
            {test: /\.js$|.jsx$/, exclude: /node_modules/, loader: 'eslint-loader'},
        ],
        loaders   : [
            {test: /[\/]angular\.js$/, loader: 'exports?angular'},
            {test: /\.css$/, loader: 'style!css!postcss'},
            {test: /\.less$/, loader: 'style!css!postcss!less'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {test: /\.json$/, loader: 'json'},
            {test: /\.html$/, exclude: /node_modules/, loader: 'html'},
            {test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url?limit=100000'},
        ],
    },
    resolve : {
        root              : [path.join(__dirname, '../bower_components')],
        extensions        : ['', '.js'],
        modulesDirectories: ['node_modules'],
    },
    progress: true,
    plugins : [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings : false,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BROWSER : JSON.stringify(true),
            },
        }),
        // print a webpack progress
        new webpack.ProgressPlugin((percentage, message) => {
            const MOVE_LEFT  = new Buffer('1b5b3130303044', 'hex').toString();
            const CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();

            process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '% :' + message + MOVE_LEFT);
        }),
    ],
    devtool : 'source-map',
};

export const development = {
    ...production,
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BROWSER : JSON.stringify(true),
            },
        }),
        // print a webpack progress
        new webpack.ProgressPlugin((percentage, message) => {
            const MOVE_LEFT  = new Buffer('1b5b3130303044', 'hex').toString();
            const CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();

            process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '% :' + message + MOVE_LEFT);
        }),
    ],
    watch  : true,
};
