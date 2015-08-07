'use strict';

// Boot up the formio server so we can access the resources.
require('dotenv').load({silent: true});
var config = require('../config')();
var Yadda = require('yadda');
var webdriver = require('webdriverjs-angular');
var fs = require('fs');
var driver = null;
var formio = null;
var library = null;
var protocol = process.env.PROTOCOL || 'http';
var domain = process.env.DOMAIN || 'localhost';
var port = process.env.PORT || 80;
var url = (port === 80)
  ? protocol + '://' + domain
  : protocol + '://' + domain + ':' + port;
var options = {
  baseUrl: url,
  desiredCapabilities: {
    browserName: 'chrome'
  },
  ngRoot: 'body'
};

Yadda.plugins.mocha.StepLevelPlugin.init();
new Yadda.FeatureFileSearch('./test/features').each(function(file) {
  before(function(done) {
    loadApiServer(done);
  });

  featureFile(file, function(feature) {
    before(function(done) {
      this.timeout(60000);

      driver = webdriver
        .remote(options)
        .init()
        .url('http://localhost:3000', done);
    });

    scenarios(feature.scenarios, function(scenario) {
      steps(scenario.steps, function(step, done) {
        loadApiServer(function() {
          Yadda.createInstance(library, { driver: driver }).run(step, done);
        });
      });
    });

    afterEach(function() {
      takeScreenshotOnFailure(this.currentTest);
    });

    after(function() {
      driver.end();
    });
  });
});

function takeScreenshotOnFailure(test) {
  if (test.state != 'passed') {
    var path = './test/screenshots/' + test.title.replace(/\W+/g, '_').toLowerCase() + '.png';
    driver.saveScreenshot(path);
  }
}

function loadApiServer(done) {
  if (formio) {
    return done();
  }

  require('formio')(config.formio, function(server) {
    formio = server;
    library = require('./lib/formio-library')(formio);
    done();
  });
}
