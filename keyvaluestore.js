/* global KeyValueStore:true */

/**
 * //TODO: Expand docs
 * @class
 */
KeyValueStore = (function() {
    /**
     * @constructor
     * @param {Meteor.Collection} collection Data storage collection.
     */
    function KeyValueStore(collection) {
        this._collection = collection;
    }


    /**
     * Set a value. It will override the current value if it already exists for this key.
     * @param {String} key Key.
     * @param {Variant} value Value.
     */
    KeyValueStore.prototype.setValue = function(key, value) {
        check(key, String);
        this._collection.upsert(
            key,
            { $set: { value: value } }
        );
    };


    /**
     * Set a value if value matches condition.
     * It will override the current value if it already exists for this key.
     * @param {String} key Key.
     * @param {Variant} value Value.
     * @param {Object} condition MongoDB condition for value.
     */
    KeyValueStore.prototype.setValueIf = function(key, value, condition) {
        check(key, String);

        try {
            this._collection.upsert(
                { _id: key, value: condition },
                { $set: { value: value } }
            );
        } catch (error) {
            if (error.name !== 'MongoError' || error.code !== 11000) {
                throw error;
            }
        }
    };


    /**
     * Get a value.
     * @param {String} key Key.
     * @param {String} [defaultValue=undefined] Default value to return if key is not found in the store.
     * @return {Variant} Value.
     */
    KeyValueStore.prototype.getValue = function(key, defaultValue) {
        check(key, String);
        var valueDoc = this._collection.findOne(key);
        return _.isObject(valueDoc) ? valueDoc.value : defaultValue;
    };


    return KeyValueStore;
})();
