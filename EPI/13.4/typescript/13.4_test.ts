import ISBNCache from './13.4';

declare function require(name: string): any;
const assert = require('assert');

const cache = new ISBNCache(5);

assert.strictEqual(cache.lookup('123'), undefined, 'cache.lookup("123") === undefined #1');

cache.insert('123', 123);

assert.strictEqual(cache.lookup('123'), 123, 'cache.lookup("123") === 123 #1');

cache.remove('123');

assert.strictEqual(cache.lookup('123'), undefined, 'cache.lookup("123") === undefined #2');

cache.insert('123', 123);

assert.strictEqual(cache.lookup('123'), 123, 'cache.lookup("123") === 123 #2');

cache.insert('234', 234);
cache.insert('345', 345);
cache.insert('456', 456);
cache.insert('123', 123);
cache.insert('567', 567);
cache.insert('678', 678);

assert.strictEqual(cache.lookup('123'), 123, 'cache.lookup("123") === 123 #3');
assert.strictEqual(cache.lookup('234'), undefined, 'cache.lookup("234") === undefined');

cache.insert('789', 789);

assert.strictEqual(cache.lookup('345'), undefined, 'cache.lookup("345") === undefined');

cache.insert('456', 456);
cache.insert('567', 567);
cache.insert('678', 678);

assert.strictEqual(cache.lookup('123'), 123, 'cache.lookup("234") === 123 #4');
assert.strictEqual(cache.lookup('456'), 456, 'cache.lookup("456") === 456');
assert.strictEqual(cache.lookup('567'), 567, 'cache.lookup("567") === 567');
assert.strictEqual(cache.lookup('678'), 678, 'cache.lookup("678") === 678');
assert.strictEqual(cache.lookup('789'), 789, 'cache.lookup("789") === 789');
