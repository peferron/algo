public func intersection(_ a: [Int], _ b: [Int]) -> [Int] {
    var result = [Int]()
    var ai = 0, bi = 0

    while (ai < a.count && bi < b.count) {
        let av = a[ai], bv = b[bi]

        if (av < bv) {
            ai += 1
        } else if (av > bv) {
            bi += 1
        } else {
            if result.isEmpty || result.last! != av {
                result.append(av)
            }
            ai += 1
            bi += 1
        }
    }

    return result
}
