import assert from 'assert';
import solve from './chinese_postman.js';

const tests = [
    {
        graph: {
            vertexCount: 2,
            directed: false,
            edges: [
                {x: 0, y: 1}
            ]
        },
        solution: [0, 1]
    }
];

tests.forEach(test => {
    assert.deepEqual(test.solution, solve(test.graph));
});

console.log('All tests OK.');
