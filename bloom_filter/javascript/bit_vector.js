'use strict';

module.exports = BitVector;

function BitVector(bitCount) {
    var byteCount = Math.ceil(bitCount / 8);
    var buffer = new ArrayBuffer(byteCount);
    this.a = new Uint8Array(buffer);
}

BitVector.prototype.set = function(bit) {
    var p = position(bit);
    this.a[p.byte] |= 1 << p.bit;
};

BitVector.prototype.has = function(bit) {
    var p = position(bit);
    return (this.a[p.byte] & 1 << p.bit) > 0;
};

function position(bit) {
    return {
        byte: bit >> 3, // Replace with Math.floor(bit / 8) for huge bit vectors.
        bit: bit % 8
    };
}
