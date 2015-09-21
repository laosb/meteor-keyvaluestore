/*jshint expr: true*/

describe('KeyValueStore', function() {

    var collection = null;
    var keyvaluestore = null;

    beforeEach(function() {
        collection = new Meteor.Collection('taskqueue_testqueue1_' + (new Date()).getTime() + '_' + ('' + Math.random()).slice(2));
        keyvaluestore = new KeyValueStore(collection);
    });

    afterEach(function() {
        collection.remove();
    });

    describe('#setValue', function () {
        it('Should insert the key into the collection', function () {
            var key = 'my_key',
                value = 'my_value';

            keyvaluestore.setValue(key, value);

            expect(collection.findOne({_id: key, value: value})).to.be.an('object');
        });
        describe('When called with a key that already exists', function () {
            it('Should update the value of the key', function () {
                var key = 'my_key';
                var value = 'my_value';

                collection.upsert(
                    key,
                    { $set: { value: 'blabalblabala' } }
                );

                keyvaluestore.setValue(key, value);

                expect(collection.findOne({_id: key, value: value})).to.be.an('object');
            });
        });
    });

    describe('#setValueIf', function () {
        describe('When value is not set', function () {
            it('Should not set the value', function () {
                var key = 'my_key';
                var value = 679;

                keyvaluestore.setValueIf(key, value, {$lt: 3});

                var result = keyvaluestore.getValue(key);

                expect(result).to.be.undefined;
            });
        });

        describe('When condition does not match', function () {
            it('Should set the value', function () {
                var key = 'my_key';
                var value = 679;

                keyvaluestore.setValue(key, 2);

                keyvaluestore.setValueIf(key, value, {$lt: 3});

                var result = keyvaluestore.getValue(key);

                expect(result).to.equal(value);
            });
        });

        describe('When condition matches', function () {
            it('Should set the value', function () {
                var key = 'my_key';
                var value = 679;

                keyvaluestore.setValue(key, 2);

                keyvaluestore.setValueIf(key, value, {$lt: 3});

                var result = keyvaluestore.getValue(key);

                expect(result).to.equal(value);
            });
        });
    });

    describe('#getValue', function () {
        it('Should return the value matching the key', function() {
            var key = 'my_key';
            var value = 'my_value';

            collection.upsert(
                key,
                { $set: { value: value } }
            );

            expect(keyvaluestore.getValue(key)).to.equal(value);
        });

        it('Should throw an error in case a non-string key is used', function() {
            var returnException = function(fn) {
                var exception = null;
                try {
                    fn();
                }
                catch (ex) {
                    exception = ex;
                }
                return exception;
            };

            var exception = null;
            exception = returnException(function() {
                var notAString = null;
                keyvaluestore.setValue(notAString, 'dummy');
            });
            expect(exception instanceof Match.Error).to.be.true;

            exception = null;
            exception = returnException(function() {
                var notAString = null;
                keyvaluestore.getValue(notAString);
            });
            expect(exception instanceof Match.Error).to.be.true;
        });

        describe('When called with defaultValue', function () {
            it('Should return the default value from getValue if the key is not found', function() {
                var value1 = keyvaluestore.getValue('non_existing_key');
                expect(value1).to.be.an('undefined');

                var defaultValue = {dummy: 'dummy'};
                var value2 = keyvaluestore.getValue('non_existing_key', defaultValue);
                expect(value2).to.equal(defaultValue);
            });
        });
    });
});
