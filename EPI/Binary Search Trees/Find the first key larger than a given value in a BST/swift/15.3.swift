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
    public func lowestValueGreaterThan(_ threshold: Int) -> Node? {
        var tree: Node? = self
        var best: Node?

        while let t = tree {
            if t.value <= threshold {
                tree = t.right
            } else {
                tree = t.left
                best = t
            }
        }

        return best
    }

    // Recursive implementation. Uses O(h) space where h is the height of the tree, instead of O(1)
    // for the iterative implementation.
    /*
    public func lowestValueGreaterThan(_ threshold: Int) -> Node? {
        if self.value <= threshold {
            // Result will be result of right child.
            return right?.lowestValueGreaterThan(threshold)
        }

        // Result will be either self or result of left child.
        if let l = left?.lowestValueGreaterThan(threshold), l.value <= self.value {
            return l
        }
        return self
    }
    */
}
