'use strict';

var assert = require('assert');

var hash_table = require('./hash_table.js');

var h = new hash_table.HashTable(10);

assert(!h.has('abc'));

h.set('abc', 5);
assert(h.has('abc'));
assert.strictEqual(h.get('abc'), 5);

h.set('abc', 7);
assert(h.has('abc'));
assert.strictEqual(h.get('abc'), 7);

h.set('def', 9);
assert(h.has('def'));
assert.strictEqual(h.get('def'), 9);

h.delete('abc');
assert(!h.has('abc'));
assert(h.has('def'));
assert.strictEqual(h.get('def'), 9);

console.log('All tests OK.');
