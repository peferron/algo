'use strict';

var assert = require('assert');

var rb_tree = require('./red-black_tree.js');

var t = new rb_tree.Tree();

assert(!t.has('abc'));

t.set('abc', 5);
assert(t.has('abc'));
assert.strictEqual(t.get('abc'), 5);

t.set('abc', 7);
assert(t.has('abc'));
assert.strictEqual(t.get('abc'), 7);

t.set('def', 9);
assert(t.has('def'));
assert.strictEqual(t.get('def'), 9);

t.delete('abc');
assert(!t.has('abc'));
assert(t.has('def'));
assert.strictEqual(t.get('def'), 9);

t.set('ghi', 1);
t.set('abc', 10);
t.set('xyz', 15);

assert.deepEqual(t.all(), [
    {key: 'abc', value: 10},
    {key: 'def', value: 9},
    {key: 'ghi', value: 1},
    {key: 'xyz', value: 15}
]);

console.log('All tests OK.');
