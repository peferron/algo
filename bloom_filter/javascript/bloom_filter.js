'use strict';

module.exports = BloomFilter;

var BitVector = require('./bit_vector.js');
var hash = require('./hash.js');

function BloomFilter(elementCount, acceptableFalsePositiveRate) {
    var size = optimalSize(elementCount, acceptableFalsePositiveRate);
    this.bitVector = new BitVector(size.bitCount);
    this.hashFunctions = getHashFunctions(size.hashCount, size.bitCount);
}

BloomFilter.prototype.add = function(key) {
    this.hashFunctions.forEach(function(f) {
        var h = f(key, 32);
        this.bitVector.set(h);
    }.bind(this));
};

BloomFilter.prototype.has = function(key) {
    return this.hashFunctions.every(function(f) {
        var h = f(key, 32);
        return this.bitVector.has(h);
    }.bind(this));
};

function optimalSize(elementCount, acceptableFalsePositiveRate) {
    var bitCount = Math.ceil(
        -elementCount * Math.log(acceptableFalsePositiveRate) / Math.pow(Math.log(2), 2)
    );
    var hashCount = Math.round(
        bitCount / elementCount * Math.log(2)
    );
    return {
        bitCount: bitCount,
        hashCount: hashCount
    };
}

function getHashFunctions(count, modulo) {
    var a = [];
    for (var i = 31; a.length < count; i++) {
        if (isPrime(i)) {
            a.push(hash.bind(null, i, modulo));
        }
    }
    return a;
}

function isPrime(n) {
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
