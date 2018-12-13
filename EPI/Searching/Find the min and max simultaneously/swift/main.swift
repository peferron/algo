public func minMax<T: Comparable>(_ elements: [T]) -> (min: T, max: T) {
    var result = (min: elements[0], max: elements[0])

    for i in stride(from: 1, to: elements.count, by: 2) {
        let pair: (min: T, max: T)

        if i == elements.count - 1 {
            pair = (min: elements[i], max: elements[i])
        } else if elements[i] < elements[i + 1] {
            pair = (min: elements[i], max: elements[i + 1])
        } else {
            pair = (min: elements[i + 1], max: elements[i])
        }

        result = (min: min(result.min, pair.min), max: max(result.max, pair.max))
    }

    return result
}
