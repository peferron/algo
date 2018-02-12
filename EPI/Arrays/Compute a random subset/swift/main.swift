// swiftlint:disable variable_name

func swap(_ array: inout [Int], _ i: Int, _ j: Int) {
    (array[i], array[j]) = (array[j], array[i])
}

// O(n) time and space, since we build an array of size n.
public func randomSubsetArray(n: Int, k: Int) -> [Int] {
    var array = (0..<n).map { $0 }

    for i in 0..<k {
        let r = i + Int(arc4random_uniform(UInt32(n - i)))
        swap(&array, i, r)
    }

    return [Int](array.prefix(k))
}

// Works exactly like randomSubsetArray, but with a dictionary to record value swaps instead of an
// array. Reduces complexity to O(k) time and space.
public func randomSubsetDictionary(n: Int, k: Int) -> [Int] {
    var values = [Int: Int]()

    for i in 0..<k {
        let r = i + Int(arc4random_uniform(UInt32(n - i)))
        let vi = values[i] ?? i
        let vr = values[r] ?? r
        values[i] = vr
        values[r] = vi
    }

    return (0..<k).map { values[$0]! }
}
