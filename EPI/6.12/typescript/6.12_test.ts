import selectInPlace from './6.12';

declare function require(name: String): any;
const assert = require('assert');

let different = false;

for (let i = 0; i < 1000; i += 1) {
    const array = Array.from({length: Math.floor(Math.random() * 100)}, () => Math.random());
    const size = Math.floor(Math.random() * array.length);
    const copy = [...array];

    selectInPlace(copy, size);

    different = different || JSON.stringify(array) !== JSON.stringify(copy);
    assert.deepStrictEqual(array.sort(), copy.sort());
}

assert(different);
