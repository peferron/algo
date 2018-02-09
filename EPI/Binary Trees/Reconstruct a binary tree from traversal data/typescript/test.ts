import {reconstruct} from './main';

declare function require(name: string): any;
const assert = require('assert');

{
    const root = reconstruct([], []);
    assert.strictEqual(root, undefined);
}

{
    const root = reconstruct([4, 2, 1, 5, 3, 6], [1, 2, 4, 3, 5, 6]);
    assert.strictEqual(root!.value, 1);
        assert.strictEqual(root!.left!.value, 2);
            assert.strictEqual(root!.left!.left!.value, 4);
                assert.strictEqual(root!.left!.left!.left, undefined);
                assert.strictEqual(root!.left!.left!.right, undefined);
            assert.strictEqual(root!.left!.right, undefined);
        assert.strictEqual(root!.right!.value, 3);
                assert.strictEqual(root!.right!.left!.value, 5);
                    assert.strictEqual(root!.right!.left!.left, undefined);
                    assert.strictEqual(root!.right!.left!.right, undefined);
                assert.strictEqual(root!.right!.right!.value, 6);
                    assert.strictEqual(root!.right!.right!.left, undefined);
                    assert.strictEqual(root!.right!.right!.right, undefined);
}

{
    const root = reconstruct([5, 1, 0, 4, 7, 2, 3, 8, 6], [7, 1, 5, 4, 0, 2, 3, 6, 8]);
    assert.strictEqual(root!.value, 7);
        assert.strictEqual(root!.left!.value, 1);
            assert.strictEqual(root!.left!.left!.value, 5);
                //assert.strictEqual(root!.left!.left!.left, undefined);
                //assert.strictEqual(root!.left!.left!.right, undefined);
            assert.strictEqual(root!.left!.right!.value, 4);
                assert.strictEqual(root!.left!.right!.left!.value, 0);
                    //assert.strictEqual(root!.left!.right!.left!.left, undefined);
                    //assert.strictEqual(root!.left!.right!.left!.right, undefined);
                //assert.strictEqual(root!.left!.right!.right!.right, undefined);
        assert.strictEqual(root!.right!.value, 2);
            //assert.strictEqual(root!.right!.left, undefined);
            assert.strictEqual(root!.right!.right!.value, 3);
                assert.strictEqual(root!.right!.right!.right!.value, 6);
                    //assert.strictEqual(root!.right!.right!.right!.left, undefined);
                    //assert.strictEqual(root!.right!.right!.right!.right, undefined);
                assert.strictEqual(root!.right!.right!.right!.left!.value, 8);
                    //assert.strictEqual(root!.right!.right!.right!.left!.left, undefined);
                    //assert.strictEqual(root!.right!.right!.right!.left!.right, undefined);
}
