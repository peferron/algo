public class Node {
    let value: Int
    let left: Node?
    let right: Node?

    public init(value: Int, left: Node? = nil, right: Node? = nil) {
        self.value = value
        self.left = left
        self.right = right
    }
}

extension Node {
    public convenience init(sortedValues: [Int]) {
        self.init(sortedValues: sortedValues, start: 0, end: sortedValues.count - 1)!
    }

    private convenience init?(sortedValues: [Int], start: Int, end: Int) {
        if start > end {
            return nil
        }

        let mid = start + (end - start) / 2

        self.init(
            value: sortedValues[mid],
            left: Node(sortedValues: sortedValues, start: start, end: mid - 1),
            right: Node(sortedValues: sortedValues, start: mid + 1, end: end)
        )
    }
}
