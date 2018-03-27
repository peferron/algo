// swiftlint:disable variable_name

class Heap<T> {
    let higherPriority: (T, T) -> Bool
    private var array = [T]()

    var count: Int {
        return array.count
    }

    init(higherPriority: @escaping (T,  T) -> Bool) {
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

public func sort<T: Comparable>(_ array: [T], k: Int) -> [T] {
    var sorted = [T]()
    let minHeap = Heap<T>(higherPriority: <)

    for element in array {
        minHeap.insert(element)
        if minHeap.count > k {
            sorted.append(minHeap.removeHighestPriority()!)
        }
    }

    while let element = minHeap.removeHighestPriority() {
        sorted.append(element)
    }

    return sorted
}
