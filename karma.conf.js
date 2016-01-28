const istanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha', 'chai', 'sinon'],
        singleRun: false,
        colors: true,
        port: 9876,
        reporters: ['mocha', 'coverage'],
        browsers: ['Chrome'],
        files: [
            'src/**/*.js',
            'tests/**/*.js',
            'dist/lr360.js'
        ],
        preprocessors: {
            'src/**/*.js': ['browserify'],
            'tests/**/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [
                require('browserify-istanbul')({
                    instrumenter: require('isparta'),
                    defaultIgnore: true
                }),
                ['babelify']
            ]
        },
        coverageReporter: {
            reporters: [
                {type: 'text'},
                {type: 'html', dir: 'coverage/'}
            ]
        }
    });
};
