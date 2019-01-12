import BitVector from './bit_vector';
import hash from './hash';

export default class BloomFilter {
    constructor(elementCount, acceptableFalsePositiveRate) {
        const size = optimalSize(elementCount, acceptableFalsePositiveRate);
        this.bitVector = new BitVector(size.bitCount);
        this.hashFunctions = getHashFunctions(size.hashCount, size.bitCount);
    }

    add(key) {
        for (const f of this.hashFunctions) {
            const h = f(key, 32);
            this.bitVector.set(h);
        }
    }

    has(key) {
        return this.hashFunctions.every(f => {
            const h = f(key, 32);
            return this.bitVector.has(h);
        });
    }
}

function optimalSize(elementCount, acceptableFalsePositiveRate) {
    const bitCount = Math.ceil(-elementCount * Math.log(acceptableFalsePositiveRate) / Math.pow(Math.log(2), 2));
    const hashCount = Math.round(bitCount / elementCount * Math.log(2));
    return {bitCount, hashCount};
}

function getHashFunctions(count, modulo) {
    const a = [];
    for (let i = 31; a.length < count; i += 1) {
        if (isPrime(i)) {
            a.push(str => hash(i, modulo, str));
        }
    }
    return a;
}

// A sieve would be faster, but that's not the subject here, so let's keep things simple.
function isPrime(n) {
    for (let i = 2; i <= Math.sqrt(n); i += 1) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
