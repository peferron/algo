import {Measurement, slidingMaxBruteForce, slidingMaxSmart} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

function runRandomTests(): void {
    for (let i = 0; i < 100; i += 1) {
        runRandomTest();
    }
}

function runRandomTest(): void {
    const {measurements, duration} = generateTest();

    const bruteForce = slidingMaxBruteForce(measurements, duration);
    bruteForce.sort((a, b) => a.time - b.time);

    const smart = slidingMaxSmart(measurements, duration);

    assert.deepStrictEqual(bruteForce, smart, `For measurements ${inspect(measurements)} and duration ${duration}, ` +
        `brute force sliding max was ${inspect(bruteForce)}, but smart sliding max was ${inspect(smart)}`);
}

function generateTest(): {measurements: Measurement[], duration: number} {
    const duration = randomInt(100);

    const measurements = Array.from(
        {length: randomInt(100)},
        () => ({
            time: randomInt(duration * 10),
            value: randomInt(100),
        })
    );

    return {measurements, duration};
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

runRandomTests();
