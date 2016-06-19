/* Information about this package */
Package.describe({
  summary: "Key-value store using a Meteor collection.",
  version: "0.2.0",
  name: "laosb:keyvaluestore",
  git: "https://github.com/laosb/meteor-keyvaluestore"
});


/* This defines your actual package */
Package.onUse(function(api) {
  api.versionsFrom('0.9.3');

  api.use([
    'underscore',
    'check'
  ], 'server');
  api.addFiles('keyvaluestore.js');
  api.export('KeyValueStore');
});


/* This defines the tests for the package */
Package.onTest(function(api) {
    api.use('gfk:keyvaluestore', 'server');
    api.use(['tinytest', 'practicalmeteor:munit'], 'server');
    api.addFiles('keyvaluestore-tests.js', 'server');
});
