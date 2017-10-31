'use strict';

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },
  allScriptSTimeout : 120000,
  getPageTimeout: 120000,
  // Spec patterns are relative to the current working directory when
  // protractor is called.
  // specs: [paths.e2e + '/**/*.js'],
  specs: ['test/test.js'],
  framework : 'mocha',
  // Options to be passed to Jasmine-node.
  //jasmineNodeOpts: {
  //  showColors: true,
  //  defaultTimeoutInterval: 30000
  //}
  mochaOpts: {
    reporter: "spec",
    slow: 1000,
    timeout: 60000
  }
};
