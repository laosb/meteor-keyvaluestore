meteor-keyvaluestore
====================

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

```
