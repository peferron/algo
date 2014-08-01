'use strict';

var assert = require('assert');

var rb_tree = require('./red-black_tree.js');

var t = new rb_tree.Tree();

assert(!t.has('abc'));

t.log();
t.set('abc', 5);
t.log();
assert(t.has('abc'));
assert.strictEqual(t.get('abc'), 5);

t.set('abc', 7);
t.log();
assert(t.has('abc'));
assert.strictEqual(t.get('abc'), 7);

t.set('def', 9);
t.log();
assert(t.has('abc'));
assert.strictEqual(t.get('abc'), 7);
assert(t.has('def'));
assert.strictEqual(t.get('def'), 9);

t.del('abc');
t.log();
assert(!t.has('abc'));
assert(t.has('def'));
assert.strictEqual(t.get('def'), 9);

t.set('ghi', 1);
t.log();
t.set('abc', 10);
t.log();
t.set('xyz', 15);
t.log();

assert.deepEqual(t.all(), [
    {key: 'abc', value: 10},
    {key: 'def', value: 9},
    {key: 'ghi', value: 1},
    {key: 'xyz', value: 15}
]);

console.log('All tests OK.');
