public struct Stack<T: Comparable> {
    private var elements = [T]()
    private var maximums = [(element: T, count: Int)]()

    public var isEmpty: Bool {
        return elements.isEmpty
    }

    public var max: T {
        return maximums.last!.element
    }

    public mutating func push(element: T) {
        elements.append(element)

        let lastMax = maximums.last
        if lastMax == nil || element > lastMax!.element {
            maximums.append((element, 1))
        } else if lastMax != nil && element == lastMax!.element {
            maximums[maximums.count - 1].count += 1
        }
    }

    public mutating func pop() -> T {
        let popped = elements.removeLast()

        if let lastMax = maximums.last where lastMax.element == popped {
            if lastMax.count > 1 {
                maximums[maximums.count - 1].count = 0
            } else {
                maximums.removeLast()
            }
        }

        return popped
    }
}
