'use strict';

var assert = require('assert');

var BloomFilter = require('./bloom_filter.js');

function testRandomSequences() {
    for (var i = 0; i < 100; i++) {
        testRandomSequence();
    }
}

function testRandomSequence() {
    var b = new BloomFilter(1000, 0.1);
    var m = {};

    var count = Math.floor(Math.random() * 1000);
    for (var i = 0; i < count; i++) {
        var key = randomKey();
        if (m.hasOwnProperty(key)) {
            continue;
        }
        if (Math.random() > 0.5) {
            m[key] = true;
            b.add(key);
        } else {
            m[key] = false;
        }
    }

    validate(b, m);
}

function validate(b, m) {
    var attempts = 0;
    var errors = 0;
    for (var key in m) {
        if (m.hasOwnProperty(key)) {
            // There cannot be false negatives.
            if (m[key]) {
                assert(b.has(key));
                continue;
            }

            // But there can be false positives.
            attempts++;
            if (b.has(key)) {
                errors++;
            }
        }
    }

    // The false positives should stay below the acceptable rate.
    if (attempts) {
        assert(errors / attempts < 0.1);
    }
}

function randomKey() {
    var l = Math.floor(1 + Math.random() * 10);
    return (Math.PI * Math.random()).toString(36).substr(2, l);
}

testRandomSequences();
