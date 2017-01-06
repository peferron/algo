public func permutations(_ array: [Int]) -> [[Int]] {
    return permutations(ArraySlice(array))
}

private func permutations(_ slice: ArraySlice<Int>) -> [[Int]] {
    if slice.isEmpty {
        return [[]]
    }

    return slice.enumerated().flatMap { (index, element) -> [[Int]] in
        // Return all permutations where `element` is in the first position.
        let otherElements = slice.prefix(upTo: index) + slice.suffix(from: index + 1)
        return permutations(otherElements).map { permutation in [element] + permutation }
    }
}
