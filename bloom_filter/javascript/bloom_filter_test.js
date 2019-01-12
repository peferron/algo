import assert from 'assert';
import BloomFilter from './bloom_filter';

function testRandomSequences() {
    for (let i = 0; i < 100; i += 1) {
        testRandomSequence();
    }
}

function testRandomSequence() {
    const b = new BloomFilter(1000, 0.1);
    const m = new Map();
    const count = Math.floor(Math.random() * 1000);

    for (let i = 0; i < count; i += 1) {
        const key = randomKey();
        if (m.has(key)) {
            continue;
        }
        if (Math.random() > 0.5) {
            m.set(key, true);
            b.add(key);
        } else {
            m.set(key, false);
        }
    }

    validate(b, m);
}

function validate(b, m) {
    let attempts = 0;
    let errors = 0;

    for (const [key, added] of m.entries()) {
        if (added) {
            // There cannot be false negatives.
            assert.ok(b.has(key));
        } else {
            // But there can be false positives.
            attempts += 1;
            if (b.has(key)) {
                errors += 1;
            }
        }
    }

    // The false positives should stay below the acceptable rate.
    if (attempts) {
        assert.ok(errors / attempts < 0.1);
    }
}

function randomKey() {
    // This random string generator is not uniform at all, but it doesn't matter for this test.
    const maxLength = Math.floor(1 + Math.random() * 10);
    return (Math.PI + Math.random()).toString(36).substr(2, maxLength);
}

testRandomSequences();
