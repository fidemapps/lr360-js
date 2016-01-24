module.exports = function () {
    config.set({
        frameworks: ['browserify', 'mocha', 'chai', 'sinon'],
        singleRun: true,
        colors: true,
        reporters: ['mocha'],
        browsers: ['Chrome'],
        files: [
            'dist/lr360.js',
            'test/client/client.js'
        ],
        preprocessors: {
            'test/client/client.js': ['browserify']
        },
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-sinon',
            'karma-browserify'
        ]
    });
};
