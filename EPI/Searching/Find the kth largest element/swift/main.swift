// swiftlint:disable variable_name

import Darwin

public func largestInPlace<T: Comparable>(array: inout [T], k: Int) -> T {
    var low = 0
    var high = array.count - 1

    while true {
        let pivotIndex = random(from: low, through: high)
        let newPivotIndex = partition(&array, low: low, high: high, pivotIndex: pivotIndex)

        if newPivotIndex < k {
            low = newPivotIndex + 1
        } else if newPivotIndex > k {
            high = newPivotIndex - 1
        } else {
            return array[newPivotIndex]
        }
    }
}

func random(from: Int, through: Int) -> Int {
    return from + Int(arc4random_uniform(UInt32(through - from) + 1))
}

func partition<T: Comparable>(_ array: inout [T], low: Int, high: Int, pivotIndex: Int) -> Int {
    let pivot = array[pivotIndex]

    swap(&array, pivotIndex, low)
    var newPivotIndex = low

    for i in low...high {
        // Move array[i] to the correct side of the pivot (left if larger, right if smaller).
        if array[i] > pivot {
            swap(&array, newPivotIndex + 1, i)
            swap(&array, newPivotIndex, newPivotIndex + 1)
            newPivotIndex += 1
        }
    }

    return newPivotIndex
}

func swap<T>(_ array: inout [T], _ i: Int, _ j: Int) {
    (array[i], array[j]) = (array[j], array[i])
}
