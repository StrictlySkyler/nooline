
/**
 * Build file for r.js; allows for making a production mode when desired.
 *
 * 'requirejs' must be installed as a global module via npm, and then this 
 * file passed as an argument to the requirejs CLI program, e.g.:
 *
 *    r.js -o production.js
 */
({

  // appDir: 'common/',

  baseUrl: './',

  mainConfigFile: 'common/js/nooline/start.js',

  // dir: 'production/common',

  optimize: 'none',

  optimizeCss: 'none',

  useStrict: true,

  findNestedDependencies: true,

  locale: 'en-us',

  dir: './production',

  // out: './common/js/production/nooline.js',

  modules: [
    {
      name: 'common/js/nooline/start'
    }
  ],

  // include: 'common/js/nooline/start',

  // cjsTranslate: true,

  onBuildRead: function (moduleName, path, contents) {

    // Remove CJS requires.
    return contents.replace(/require\('.+'\)/g, null);
  },

  fileExclusionRegExp: /^\.|controllers|logs|routes|\.json/

  // skipModuleInsertion: true
})