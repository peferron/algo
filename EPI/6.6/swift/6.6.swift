// swiftlint:disable variable_name

public func removeDuplicates(inout array: [Int]) {
    var deduplicated = 1

    for i in 1.stride(to: array.count, by: 1) {
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
