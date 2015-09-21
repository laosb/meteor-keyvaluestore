meteor-keyvaluestore
====================
[![Build Status](https://secure.travis-ci.org/gfk-ba/meteor-keyvaluestore.png)](http://travis-ci.org/gfk-ba/meteor-keyvaluestore)

Simple setup for a keyvaluestore in meteor

## Installation

```
meteor add gfk:keyvaluestore
```

##Use

```
//Create a instance of the keyValueStore
var keyValueStoreCollection = new Meteor.Collection('keyvalue');
keyValueStore = new KeyValueStore(keyValueStoreCollection);

//Setting a value
keyValueStore.setValue('foo', 'bar');

keyValueStore.getValue('foo'); //returns bar
keyValueStore.getValue('nonexisting'); //returns undefined
keyValueStore.getValue('nonexisting', 'foobar'); //returns foobar

//Setting a value conditionally
keyValueStore.setValue('bar', 4);

keyValueStore.setValueIf('bar', 5, {$lt: 3});
keyValueStore.getValue('bar'); //returns 4

keyValueStore.setValueIf('bar', 5, {$gt: 3});
keyValueStore.getValue('bar'); //returns 5
```
