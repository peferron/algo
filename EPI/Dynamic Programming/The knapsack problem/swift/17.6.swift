public typealias Item = (value: Int, weight: Int)

public func select(_ items: [Item], capacity: Int) -> [Int] {
    // values[i][c] is the best value achievable using items[0...i] and capacity c.
    let row = [Int: Int]()
    var values = items.map { _ in row }

    _ = solve(ArraySlice(items), capacity: capacity, values: &values)

    return reconstruct(ArraySlice(items), capacity: capacity, values: &values)
}

// Returns the best value achievable using the given items and capacity, filling values as it goes.
private func solve(_ items: ArraySlice<Item>, capacity: Int, values: inout [[Int: Int]]) -> Int {
    if items.count == 0 || capacity <= 0 {
        return 0
    }

    if values[items.count - 1][capacity] == nil {
        // What is the best value achievable if the last item is not included?
        let valueWithoutLastItem = solve(items.dropLast(), capacity: capacity, values: &values)

        // What is the best value achievable if the last item is included?
        let remainingCapacity = capacity - items.last!.weight
        let valueWithLastItem = remainingCapacity < 0 ? 0 :
            items.last!.value + solve(items.dropLast(), capacity: remainingCapacity, values: &values)

        values[items.count - 1][capacity] = max(valueWithoutLastItem, valueWithLastItem)
    }

    return values[items.count - 1][capacity]!
}

private func reconstruct(_ items: ArraySlice<Item>, capacity: Int, values: inout [[Int: Int]]) -> [Int] {
    if items.count == 0 || capacity <= 0 {
        return []
    }

    let valueWithLastItem = solve(items, capacity: capacity, values: &values)
    let valueWithoutLastItem = solve(items.dropLast(), capacity: capacity, values: &values)

    if valueWithLastItem == valueWithoutLastItem {
        // The last item is not included.
        return reconstruct(items.dropLast(), capacity: capacity, values: &values)
    }

    // The last item is included.
    let remainingCapacity = capacity - items.last!.weight
    return reconstruct(items.dropLast(), capacity: remainingCapacity, values: &values) +
        [items.count - 1]
}
