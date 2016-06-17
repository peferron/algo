// swiftlint:disable variable_name

class MinHeap<T> {
    let lower: (T, T) -> Bool
    private var array = [T]()

    init(lower: (T, T) -> Bool) {
        self.lower = lower
    }

    private func parentIndex(i: Int) -> Int? {
        return i > 0 ? (i - 1) / 2 : nil
    }

    private func swap(i: Int, _ j: Int) {
        (array[i], array[j]) = (array[j], array[i])
    }

    private func bubbleUp(i: Int) {
        if let pi = parentIndex(i) where lower(array[i], array[pi]) {
            swap(i, pi)
            bubbleUp(pi)
        }
    }

    func insert(element: T) {
        array.append(element)
        bubbleUp(array.count - 1)
    }

    private func leftChildIndex(i: Int) -> Int? {
        let lci = i * 2 + 1
        return lci < array.count ? lci : nil
    }

    private func rightChildIndex(i: Int) -> Int? {
        let rci = i * 2 + 2
        return rci < array.count ? rci : nil
    }

    private func bubbleDown(i: Int) {
        if let lci = leftChildIndex(i) {
            let minChildIndex: Int
            if let rci = rightChildIndex(i) where lower(array[rci], array[lci]) {
                minChildIndex = rci
            } else {
                minChildIndex = lci
            }

            if lower(array[minChildIndex], array[i]) {
                swap(minChildIndex, i)
                bubbleDown(minChildIndex)
            }
        }
    }

    func removeMin() -> T? {
        switch array.count {
        case 0:
            return nil
        case 1:
            return array.removeLast()
        default:
            let first = array[0]
            array[0] = array.removeLast()
            bubbleDown(0)
            return first
        }
    }
}

public func merge<T: Comparable>(sequences: [[T]]) -> [T] {
    // Indexes of the first unmerged element of each sequence.
    var currentIndexes = [Int](count: sequences.count, repeatedValue: 0)

    // Convenience function to get the first unmerged element of the sequence at the given index.
    let currentElement = { sequences[$0][currentIndexes[$0]] }

    // First, we insert the first element of each sequence into the heap.
    let minHeap = MinHeap { currentElement($0) < currentElement($1) }
    for (sequenceIndex, sequence) in sequences.enumerate() where !sequence.isEmpty {
        minHeap.insert(sequenceIndex)
    }

    // Then, we repeatedly remove the minimum element from the heap, and insert the next element (if
    // any) from the corresponding sequence.
    var merged = [T]()
    while let sequenceIndex = minHeap.removeMin() {
        merged.append(currentElement(sequenceIndex))
        currentIndexes[sequenceIndex] += 1
        if currentIndexes[sequenceIndex] < sequences[sequenceIndex].count {
            minHeap.insert(sequenceIndex)
        }
    }
    return merged
}
