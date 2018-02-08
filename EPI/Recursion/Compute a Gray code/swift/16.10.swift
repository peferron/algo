public func grayCode(bitCount: Int) -> [Int] {
    if bitCount <= 0 {
        return [0]
    }

    let prev = grayCode(bitCount: bitCount -  1)
    let leadingOne = 1 << (bitCount - 1)

    return prev + prev.reversed().map { leadingOne + $0 }
}
