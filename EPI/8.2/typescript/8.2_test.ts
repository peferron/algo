import {reverse} from './8.2';

declare function require(name: String): any;
const assert = require('assert');

{
    const a = {};
    const reversed = reverse(a);
    assert.strictEqual(reversed, a);
    assert.strictEqual(reversed.next, undefined);
}

{
    const b = {};
    const a = {next: b};
    const reversed = reverse(a);
    assert.strictEqual(reversed, b);
    assert.strictEqual(reversed.next, a);
    assert.strictEqual(reversed.next!.next, undefined);
}

{
    const c = {};
    const b = {next: c};
    const a = {next: b};
    const reversed = reverse(a);
    assert.strictEqual(reversed, c);
    assert.strictEqual(reversed.next, b);
    assert.strictEqual(reversed.next!.next, a);
    assert.strictEqual(reversed.next!.next!.next, undefined);
}
