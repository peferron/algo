// swiftlint:disable variable_name

public func removeDuplicates(_ array: inout [Int]) {
    var deduplicated = 1

    for i in stride(from: 1, to: array.count, by: 1) {
        if array[i] != array[deduplicated - 1] {
            array[deduplicated] = array[i]
            deduplicated += 1
        }
    }

    while array.count > deduplicated {
        array.removeLast()
    }
}
