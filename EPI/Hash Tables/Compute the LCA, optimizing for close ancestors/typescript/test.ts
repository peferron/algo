import {LCA} from './main';

declare function require(name: string): any;
const assert = require('assert');

const a = {};
    const b = {parent: a};
        const d = {parent: b};
        const e = {parent: b};
            const f = {parent: e};
    const c = {parent: a};

const x = {};

assert.strictEqual(LCA(a, a), a);
assert.strictEqual(LCA(a, x), undefined);
assert.strictEqual(LCA(d, f), b);
assert.strictEqual(LCA(a, d), a);
assert.strictEqual(LCA(c, e), a);
