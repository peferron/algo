public func mergeInPlace(target a: inout [Int?], source b: [Int]) {
    // ai is the index of the last non-nil element in a.
    var ai = -1
    for av in a {
        if av == nil {
            break
        }
        ai += 1
    }

    // bi is the index of the last element in b.
    var bi = b.count - 1

    // We can stop iterating after all elements in b have been processed, since the remaining
    // elements in a are already sorted.
    while bi >= 0 {
        // ti is the index at which the max of a[ai] and b[bi] should be copied.
        let ti = ai + bi + 1

        if (ai >= 0 && a[ai]! > b[bi]) {
            a[ti] = a[ai]!
            ai -= 1
        } else {
            a[ti] = b[bi]
            bi -= 1
        }
    }
}
