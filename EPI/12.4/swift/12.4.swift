public func indexOfSmallest<T: Comparable>(array: [T]) -> Int {
    var low = 0
    var high = array.count - 1

    while low < high {
        let mid = low + (high - low) / 2

        if array[mid] < array[high] {
            high = mid
        } else {
            low = mid + 1
        }
    }

    return low
}
