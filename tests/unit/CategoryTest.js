GLOBAL.__root = __dirname + '/../..';
GLOBAL.window = require('jsdom').jsdom('<html></html>').parentWindow;

var assert = require("assert");
var fs = require('fs');
var testDomain = 'nooline.test';
var testSnippet = JSON.stringify({
  "asset": {
    "caption": "",
    "credit": "",
    "media": "",
    "thumbnail": ""
  },
  "author": "test",
  "endDate": "",
  "endTime": "",
  "headline": "Test Data",
  "index": 1,
  "prettyStartDate": "Thursday, July 7th, 2014",
  "prettyStartTime": "06:44:02 pm",
  "published": true,
  "startDate": "2014,7,24",
  "startTime": "18:44:2",
  "tag": "",
  "text": "Test content",
  "type": "test",
  "url": "/test/1",
  "uuid": "some-uuid-1",
  "id": 1
}, null, '\t');
var testIndex = JSON.stringify({
  "count": 1,
  "categories": {
    "test": [
      1
    ]
  }
}, null, '\t');
var testMeta = JSON.stringify({
  "type": "test"
}, null, '\t');
var testConfig = JSON.stringify({
  "partials": {
    "head": "partials/head",
    "timeline": "partials/timeline",
    "scroll": "partials/scroll",
    "global-header": "partials/global-header",
    "meta": "partials/meta",
    "global-footer": "partials/global-footer",
    "global-scripts": "partials/global-scripts"
  },
  "mode": "debug",
  "startPaths": {
    "debug": "/common/js/nooline/start",
    "production": "/production/common/js/nooline/start"
  },
  "categories": [
    "scroll"
  ]
}, null, '\t');

var testConfigPath;
var Category;
var CategoryView;
var Snippets;
var _category;

var infoStub = {
  req: {
    host: testDomain
  },
  res: {
    status: function (code) {

      this.statusCode = code;

      return this;
    },
    render: function (template, options) {

      this.renderedTemplate = template;
      this.templateOptions = options;

    }
  },
  domain: testDomain
};
var testType = 'test';

var testDomainPath = __root + '/sites/' + testDomain;
var testContentPath = testDomainPath + '/content/';
var testIndexPath = testContentPath + 'index.json';
var testSnippetPath = testContentPath + 'snippets/1.json';
var testMetaPath = testContentPath + 'meta/test.json';
var testConfigPath = testDomainPath + '/config/site.json';

before(function () {
  Category = require(__root
    + '/common/js/nooline/models/category.js');
  CategoryView = require(__root
    + '/common/js/nooline/views/category-view.js');
  Snippets = require(__root
    + '/common/js/nooline/collections/snippets.js');

  if (fs.existsSync(testConfigPath)) {
    fs.unlinkSync(testConfigPath);
  }

  if (fs.existsSync(testDomainPath + '/config/')) {
    fs.rmdirSync(testDomainPath + '/config/');
  }

  if (fs.existsSync(testSnippetPath)) {
    fs.unlinkSync(testSnippetPath);
  }

  if (fs.existsSync(testContentPath + 'snippets')) {
    fs.rmdirSync(testContentPath + 'snippets');
  }

  if (fs.existsSync(testMetaPath)) {
    fs.unlinkSync(testMetaPath);
  }

  if (fs.existsSync(testContentPath + 'meta')) {
    fs.rmdirSync(testContentPath + 'meta');
  }

  if (fs.existsSync(testIndexPath)) {
    fs.unlinkSync(testIndexPath);
  }

  if (fs.existsSync(testContentPath)) {
    fs.rmdirSync(testContentPath);
  }

  if (fs.existsSync(testDomainPath)) {
    fs.rmdirSync(testDomainPath);
  }

  fs.mkdirSync(testDomainPath);
  fs.mkdirSync(testContentPath);
  fs.writeFileSync(testIndexPath, testIndex);
  fs.mkdirSync(testContentPath + 'snippets');
  fs.writeFileSync(testSnippetPath, testSnippet);
  fs.mkdirSync(testContentPath + 'meta');
  fs.writeFileSync(testMetaPath, testMeta);
  fs.mkdirSync(testDomainPath + '/config/');
  fs.writeFileSync(testConfigPath, testConfig);
});

after(function () {
  fs.unlinkSync(testConfigPath);
  fs.rmdirSync(testDomainPath + '/config/');
  fs.unlinkSync(testSnippetPath);
  fs.rmdirSync(testContentPath + 'snippets');
  fs.unlinkSync(testMetaPath);
  fs.rmdirSync(testContentPath + 'meta');
  fs.unlinkSync(testIndexPath);
  fs.rmdirSync(testContentPath);
  fs.rmdirSync(testDomainPath);
});

describe('A Category', function () {

  it('should be able to be created', function () {

    _category = new Category();

    assert(
      _category instanceof Category,
      '_category is not an instance of Category model.'
    );
  });

  it('should have a view attached to it', function () {

    assert(
      _category.view instanceof CategoryView,
      'Looks like the view is missing, or the wrong thing.'
    );
  });

  it('should be able to load a collection of content', function (done) {

    _category.loadCollection(infoStub, testType);

    _category.on('snippet:loaded', function () {

      assert(
        _category.get('snippets') instanceof Snippets,
        'No collection of content found, or it is the wrong thing.'
      );

      done();
    });

  });

});
