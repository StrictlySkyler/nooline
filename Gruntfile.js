module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          // Require blanket wrapper here to instrument other required
          // files on the fly.
          //
          // NB. We cannot require blanket directly as it
          // detects that we are not running mocha cli and loads differently.
          //
          // NNB. As mocha is 'clever' enough to only run the tests once for
          // each file the following coverage task does not actually run any
          // tests which is why the coverage instrumentation has to be done here
          require: 'coverage/blanket'
        },
        src: ['tests/**/*.js']
      },
      coverage: {
        options: {
          //reporter: 'html-cov',
          reporter: 'mocha-lcov-reporter',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          //captureFile: 'coverage/coverage.html'
          captureFile: 'coverage/coverage.lcov'
        },
        src: ['tests/**/*.js']
      }
    }
  });

  grunt.registerTask('default', 'mochaTest');
};
