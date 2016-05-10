public func increment(inout number: [Int]) {
    for i in (0..<number.count).reverse() {
        if number[i] < 9 {
            number[i] += 1
            return
        }
        number[i] = 0
    }
    number.insert(1, atIndex: 0)
}
