import randomSubset from './main';

declare function require(name: string): any;
const assert = require('assert');

function test(): void {
    const n = Math.floor(Math.random() * 100);
    const k = Math.floor(Math.random() * (n + 1));
    const subset = randomSubset(n, k);

    // Verify that subset has the expected length.
    assert.strictEqual(subset.length, k);

    // Verify that subset has no duplicates.
    assert.strictEqual(new Set(subset).size, k);

    // Verify that the elements of subset are in 0..<n.
    assert(subset.every(v => 0 <= v && v < n));
}

for (let i = 0; i < 100; i += 1) {
    test();
}
