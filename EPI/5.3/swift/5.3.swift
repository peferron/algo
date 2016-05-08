let table: [UInt16] = [
    0b0000, // Reverse of 0b0000
    0b1000, // Reverse of 0b0001
    0b0100, // Reverse of 0b0010
    0b1100, // Reverse of 0b0011
    0b0010, // Reverse of 0b0100
    0b1010, // Reverse of 0b0101
    0b0110, // Reverse of 0b0110
    0b1110, // Reverse of 0b0111
    0b0001, // Reverse of 0b1000
    0b1001, // Reverse of 0b1001
    0b0101, // Reverse of 0b1010
    0b1101, // Reverse of 0b1011
    0b0011, // Reverse of 0b1100
    0b1011, // Reverse of 0b1101
    0b1110, // Reverse of 0b1110
    0b1111, // Reverse of 0b1111
]

// O(n/L) where n is the number of bits of the number type, and L the number of bits covered by the
// table.
public func reverse(number: UInt16) -> UInt16 {
    var n = number
    var reverse: UInt16 = 0

    for _ in 1...4 {
        reverse = reverse << 4 | table[Int(n & 0b1111)]
        n >>= 4
    }

    return reverse
}
