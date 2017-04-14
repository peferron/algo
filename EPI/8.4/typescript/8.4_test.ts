import {Node, getFirstNodeInCycle} from './8.4';

declare function require(name: String): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

type Test = {list: Node, firstNodeInCycle: Node | undefined};

const tests: Test[] = [];

{
    // 0 -> 0
    const list: Node = {};
    list.next = list;
    tests.push({list, firstNodeInCycle: list});
}

{
    // 0 -> 1 -> 0
    const list: Node = {next: {}};
    list.next!.next = list;
    tests.push({list, firstNodeInCycle: list});
}

{
    // 0 -> 1 -> 2 -> 0
    const list: Node = {next: { next: {}}};
    list.next!.next!.next = list;
    tests.push({list, firstNodeInCycle: list});
}

{
    // 0 -> 1 -> 2 -> 1
    const list: Node = {next: { next: {}}};
    list.next!.next!.next = list.next;
    tests.push({list, firstNodeInCycle: list});
}

{
    // 0 -> undefined
    tests.push({list: {}, firstNodeInCycle: undefined});
}

{
    // 0 -> 1 -> undefined
    tests.push({list: {next: {}}, firstNodeInCycle: undefined});
}

for (const test of tests) {
    const actual = getFirstNodeInCycle(test.list);
    assert.deepStrictEqual(actual, test.firstNodeInCycle, `For test list ${inspect(test.list)}, ` +
        `expected first node in cycle to be ${inspect(test.firstNodeInCycle)}, ` +
        `but was ${inspect(actual)}`);
}
