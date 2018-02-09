public func hasThreeSum(_ numbers: [Int], sum: Int) -> Bool {
    let sortedNumbers = numbers.sorted()

    return numbers.contains {
        hasTwoSum(sortedNumbers, sum: sum - $0)
    }
}

private func hasTwoSum(_ sortedNumbers: [Int], sum: Int) -> Bool {
    var i = 0
    var j = sortedNumbers.count - 1

    while i <= j {
        let s = sortedNumbers[i] + sortedNumbers[j]

        if s == sum {
            return true
        }

        if s < sum {
            i += 1
        } else {
            j -= 1
        }
    }

    return false
}
