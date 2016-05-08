// O(n) where n is the size of the value type.
public func parityBruteforceReduce(value: UInt64) -> UInt {
    return (0..<64).reduce(0) { (parity, i) in parity ^ UInt(value >> i & 1) }
}

// Still O(n), but much faster than the reduce.
public func parityBruteforceLoop(value: UInt64) -> UInt {
    var parity: UInt = 0
    var v = value
    while v != 0 {
        parity ^= UInt(v & 1)
        v >>= 1
    }
    return parity
}

// O(k) where k is the number of bits set to 1 in the value.
public func parityBruteforceDropLowestBit(value: UInt64) -> UInt {
    var parity: UInt = 0
    var v = value
    while v != 0 {
        parity ^= 1
        v &= (v - 1)
    }
    return parity
}

// O(log n) where n is the size of the value type.
public func parityXor(value: UInt64) -> UInt {
    var v = value
    v ^= v >> 32
    v ^= v >> 16
    v ^= v >> 8
    v ^= v >> 4
    v ^= v >> 2
    v ^= v >> 1
    return UInt(v & 1)
}
