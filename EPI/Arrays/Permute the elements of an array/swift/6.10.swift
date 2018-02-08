// swiftlint:disable variable_name

func swap(_ array: inout [Int], _ i: Int, _ j: Int) {
    (array[i], array[j]) = (array[j], array[i])
}

// O(n) time and O(n) space, since we copy the permutation array.
public func permuteSwap(array: inout [Int], permutation: [Int]) {
    var p = permutation
    var i = 0
    while i < array.count {
        let destination = p[i]
        if destination == i {
            i += 1
        } else {
            swap(&array, i, destination)
            p[i] = p[destination]
            p[destination] = destination
        }
    }
}

// O(n) time and O(1) space, but we need to be able to temporarily mutate permutation.
public func permuteCycles(array: inout [Int], permutation: inout [Int]) {
    for i in 0..<array.count {
        var current = i
        while permutation[current] >= 0 {
            let next = permutation[current]
            // array[i] serves as a temporarily holding space for the value ousted from array[pj].
            swap(&array, i, next)
            // Trick: to mark the permutation as processed without losing information, we substract
            // the array count to make it negative.
            permutation[current] -= permutation.count
            // Move to the next step in the cycle.
            current = next
        }
    }

    for i in 0..<permutation.count {
        permutation[i] += permutation.count
    }
}
