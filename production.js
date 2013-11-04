
/**
 * Build file for r.js; allows for making a production mode when desired.
 *
 * 'requirejs' must be installed as a global module via npm, and then this 
 * file passed as an argument to the requirejs CLI program, e.g.:
 *
 *    r.js -o production.js
 */
({

  baseUrl: './',

  mainConfigFile: 'common/js/nooline/start.js',

  optimize: 'uglify2',

  optimizeCss: 'standard',

  useStrict: true,

  findNestedDependencies: true,

  locale: 'en-us',

  dir: './production',

  modules: [
    {
      name: 'common/js/nooline/start'
    }
  ],

  onBuildRead: function (moduleName, path, contents) {

    // Remove CJS requires.
    return contents.replace(/require\('.+'\)/g, null);
  },

  fileExclusionRegExp: /^\.|controllers|logs|routes|\.json/

})