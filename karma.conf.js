var reporters = [];
var transform = [];
var coverageReporter = null;

function isDebug(argument) {
  return argument === '--debug';
}

function isCoverage(argument) {
  return argument === '--coverage';
}

if (!process.argv.some(isDebug) && process.argv.some(isCoverage)) {
  reporters.push('coverage');
  transform = [
        require('browserify-istanbul')({
          instrumenter: require('isparta'),
          defaultIgnore: true,
        }),
    ];
  coverageReporter = {
    reporters: [
        { type: 'text' },
        { type: 'html', dir: 'coverage/' },
    ],
  };
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'chai', 'sinon'],
    singleRun: true,
    colors: true,
    port: 9876,
    reporters: ['mocha'].concat(reporters),
    browsers: ['Chrome'],
    files: [
        'src/**/*.js',
        'tests/**/*.js',
        'dist/lr360-min.js',
    ],
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'tests/**/*.js': ['browserify'],
    },
    browserify: {
      debug: true,
      transform: transform.concat([['babelify']]),
    },
    coverageReporter: coverageReporter,
  });
};
