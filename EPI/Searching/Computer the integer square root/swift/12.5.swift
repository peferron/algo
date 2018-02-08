public func root(_ value: Int) -> Int {
    var low = 0
    var high = value

    while low <= high {
        let mid = low + (high - low) / 2

        if Double(mid) * Double(mid) <= Double(value) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    return low - 1
}
