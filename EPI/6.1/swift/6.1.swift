// swiftlint:disable variable_name

public func dutchInPlace(inout array: [Int], pivotIndex: Int) {
    let pivot = array[pivotIndex]
    var lowerCount = 0
    var equalCount = 0

    for i in 0..<array.count {
        if array[i] < pivot {
            // Append array[i] to the lower section. We do that by swapping array[i] with the first
            // element equal or greater than the pivot.
            swap(&array, i, lowerCount)
            if equalCount > 0 {
                // array[i] now contains an element equal to the pivot. To keep respecting the Dutch
                // layout, we need to move it to the end of the equal section.
                swap(&array, i, lowerCount + equalCount)
            }
            lowerCount += 1
        } else if array[i] == pivot {
            // Append array[i] to the equal section.
            swap(&array, i, lowerCount + equalCount)
            equalCount += 1
        }
    }
}

func swap(inout array: [Int], _ i: Int, _ j: Int) {
    (array[i], array[j]) = (array[j], array[i])
}
