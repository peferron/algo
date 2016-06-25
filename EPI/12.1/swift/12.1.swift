public func firstIndexOf<T: Comparable>(element: T, inSortedArray array: [T]) -> Int {
    var low = 0
    var high = array.count - 1
    var index = -1

    while low <= high {
        let mid = low + (high - low) / 2
        let midElement = array[mid]

        if midElement < element {
            low = mid + 1
        } else if midElement > element {
            high = mid - 1
        } else {
            index = mid
            high = mid - 1
        }
    }

    return index
}
