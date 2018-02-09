import {sort} from './main';

declare function require(name: string): any;
const assert = require('assert');

{
    const a = {value: 5};
    const head = sort(a);
    assert.strictEqual(head, a);
    assert.strictEqual(head.next, undefined);
}

{
    const b = {value: 5};
    const a = {value: 3, next: b};
    const head = sort(a);
    assert.strictEqual(head, a);
    assert.strictEqual(head.next!, b);
    assert.strictEqual(head.next!.next, undefined);
}

{
    const b = {value: 3};
    const a = {value: 5, next: b};
    const head = sort(a);
    assert.strictEqual(head, b);
    assert.strictEqual(head.next!, a);
    assert.strictEqual(head.next!.next, undefined);
}

{
    const d = {value: 4};
    const c = {value: 3, next: d};
    const b = {value: 4, next: c};
    const a = {value: 5, next: b};
    const head = sort(a);
    assert.strictEqual(head, c);
    assert.strictEqual(head.next!, b);
    assert.strictEqual(head.next!.next!, d);
    assert.strictEqual(head.next!.next!.next!, a);
    assert.strictEqual(head.next!.next!.next!.next, undefined);
}
