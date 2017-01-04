public struct Pair {
    let a: Int
    let b: Int
    let value: Double

    init(a: Int, b: Int) {
        self.a = a
        self.b = b
        self.value = Double(a) + Double(b) * sqrt(2)
    }
}

public func pairs(count: Int) -> [Pair] {
    if count < 1 {
        return []
    }

    var pairs = [Pair(a: 0, b: 0)]

    // i is the lowest index such that pairs[i].value + 1 is greater than pairs.last!.value.
    var i = 0

    // j is the lowest index such that pairs[j].value + √2 is greater than pairs.last!.value.
    var j = 0

    while pairs.count < count {
        let pi = pairs[i]
        let nextpi = Pair(a: pi.a + 1, b: pi.b)

        let pj = pairs[j]
        let nextpj = Pair(a: pj.a, b: pj.b + 1)

        if nextpi.value < nextpj.value {
            pairs.append(nextpi)
            i += 1
        } else if nextpi.value > nextpj.value {
            pairs.append(nextpj)
            j += 1
        } else {
            // Case where nextpi.value == nextpj.value. This only happens when nextpi == nextpj, for
            // example when pi == (a: 0, b: 1) and pj == (a: 1, b: 0).
            pairs.append(nextpi)
            i += 1
            j += 1
        }
    }

    return pairs
}
