// swiftlint:disable variable_name

public func removeDuplicates(inout array: [Int]) {
    if array.isEmpty {
        return
    }

    var deduplicated = 1

    for i in 1..<array.count {
        if array[i] != array[deduplicated - 1] {
            swap(&array, i, deduplicated)
            deduplicated += 1
        }
    }

    while array.count > deduplicated {
        array.removeLast()
    }
}

func swap(inout array: [Int], _ i: Int, _ j: Int) {
    (array[i], array[j]) = (array[j], array[i])
}
