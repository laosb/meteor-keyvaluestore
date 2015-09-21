/* Information about this package */
Package.describe({
  summary: "Key-value store using a Meteor collection.",
  version: "0.1.3",
  name: "gfk:keyvaluestore",
  git: "https://github.com/gfk-ba/meteor-keyvaluestore"
});


/* This defines your actual package */
Package.onUse(function(api) {
  api.versionsFrom('0.9.3');

  api.use([
    'underscore',
    'check'
  ], 'server');
  api.addFiles('keyvaluestore.js', 'server');
  api.export('KeyValueStore', 'server');
});


/* This defines the tests for the package */
Package.onTest(function(api) {
    api.use('gfk:keyvaluestore', 'server');
    api.use(['tinytest', 'practicalmeteor:munit'], 'server');
    api.addFiles('keyvaluestore-tests.js', 'server');
});
