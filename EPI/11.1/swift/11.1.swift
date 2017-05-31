// swiftlint:disable variable_name

class Heap<T> {
    let higherPriority: (T, T) -> Bool
    private var array = [T]()

    init(higherPriority: @escaping (T, T) -> Bool) {
        self.higherPriority = higherPriority
    }

    private func parentIndex(_ i: Int) -> Int? {
        return i > 0 ? (i - 1) / 2 : nil
    }

    private func swap(_ i: Int, _ j: Int) {
        (array[i], array[j]) = (array[j], array[i])
    }

    private func bubbleUp(_ i: Int) {
        if let pi = parentIndex(i), higherPriority(array[i], array[pi]) {
            swap(i, pi)
            bubbleUp(pi)
        }
    }

    func insert(_ element: T) {
        array.append(element)
        bubbleUp(array.count - 1)
    }

    private func leftChildIndex(_ i: Int) -> Int? {
        let lci = i * 2 + 1
        return lci < array.count ? lci : nil
    }

    private func rightChildIndex(_ i: Int) -> Int? {
        let rci = i * 2 + 2
        return rci < array.count ? rci : nil
    }

    private func bubbleDown(_ i: Int) {
        if let lci = leftChildIndex(i) {
            let priorityChildIndex: Int
            if let rci = rightChildIndex(i), higherPriority(array[rci], array[lci]) {
                priorityChildIndex = rci
            } else {
                priorityChildIndex = lci
            }

            if higherPriority(array[priorityChildIndex], array[i]) {
                swap(priorityChildIndex, i)
                bubbleDown(priorityChildIndex)
            }
        }
    }

    func removeHighestPriority() -> T? {
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

public func merge<T: Comparable>(_ sequences: [[T]]) -> [T] {
    // Indexes of the first unmerged element of each sequence.
    var currentIndexes = [Int](repeating: 0, count: sequences.count)

    // Convenience function to get the first unmerged element of the sequence at the given index.
    let currentElement = { sequences[$0][currentIndexes[$0]] }

    // First, we insert the first element of each sequence into the heap.
    let minHeap = Heap { currentElement($0) < currentElement($1) }
    for (sequenceIndex, sequence) in sequences.enumerated() where !sequence.isEmpty {
        minHeap.insert(sequenceIndex)
    }

    // Then, we repeatedly remove the minimum element from the heap, and insert the next element (if
    // any) from the corresponding sequence.
    var merged = [T]()
    while let sequenceIndex = minHeap.removeHighestPriority() {
        merged.append(currentElement(sequenceIndex))
        currentIndexes[sequenceIndex] += 1
        if currentIndexes[sequenceIndex] < sequences[sequenceIndex].count {
            minHeap.insert(sequenceIndex)
        }
    }
    return merged
}
