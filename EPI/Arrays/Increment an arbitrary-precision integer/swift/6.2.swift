public func increment(_ number: inout [Int]) {
    for i in (0..<number.count).reversed() {
        if number[i] < 9 {
            number[i] += 1
            return
        }
        number[i] = 0
    }
    number.insert(1, at: 0)
}
