// swiftlint:disable variable_name

import Darwin

let fns = [randomSubsetArray, randomSubsetDictionary]

func test(_ fn: (Int, Int) -> [Int] ) {
    let n = Int(arc4random_uniform(100))
    let k = Int(arc4random_uniform(UInt32(n) + 1))
    let subset = fn(n, k)

    guard isValidSubset(subset, n: n, k: k) else {
        print("For n \(n) and k \(k), got invalid subset \(subset)")
        exit(1)
    }
}

func isValidSubset(_ subset: [Int], n: Int, k: Int) -> Bool {
    // Verify that subset has the expected count.
    guard subset.count == k else {
        return false
    }

    // Verify that subset has no duplicates.
    guard Set(subset).count == k else {
        return false
    }

    // Verify that the elements of subset are in 0..<n.
    guard !(subset.contains { $0 < 0 && $0 >= n }) else {
        return false
    }

    return true
}

for fn in fns {
    for _ in 0...100 {
        test(fn)
    }
}
