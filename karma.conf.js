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
            'src/**/*.js'
        ],
        preprocessors: {
            'src/**/*.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [
                ['babelify', {presets: ['es2015']}],
                'istanbulify'
            ],
            extensions: ['.js']
        },
        coverageReporter: {
            reporters: [
                {'type': 'text'}
            ]
        }
    });
};
