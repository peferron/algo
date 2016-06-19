// swiftlint:disable variable_name

class Heap<T> {
    let higherPriority: (T, than: T) -> Bool
    private var array = [T]()

    var count: Int {
        return array.count
    }

    init(higherPriority: (T, than: T) -> Bool) {
        self.higherPriority = higherPriority
    }

    private func parentIndex(i: Int) -> Int? {
        return i > 0 ? (i - 1) / 2 : nil
    }

    private func swap(i: Int, _ j: Int) {
        (array[i], array[j]) = (array[j], array[i])
    }

    private func bubbleUp(i: Int) {
        if let pi = parentIndex(i) where higherPriority(array[i], than: array[pi]) {
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
            let priorityChildIndex: Int
            if let rci = rightChildIndex(i) where higherPriority(array[rci], than: array[lci]) {
                priorityChildIndex = rci
            } else {
                priorityChildIndex = lci
            }

            if higherPriority(array[priorityChildIndex], than: array[i]) {
                swap(priorityChildIndex, i)
                bubbleDown(priorityChildIndex)
            }
        }
    }

    var highestPriority: T? {
        return array.first
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

func rebalance<T>(a: Heap<T>, _ b: Heap<T>) {
    if a.count < b.count {
        a.insert(b.removeHighestPriority()!)
    } else if a.count > b.count + 1 {
        b.insert(a.removeHighestPriority()!)
    }
}

func median(a: Heap<Int>, _ b: Heap<Int>) -> Float {
    return a.count > b.count ?
        Float(a.highestPriority!) :
        Float(a.highestPriority! + b.highestPriority!) / 2
}

public func medians(values: [Int]) -> [Float] {
    var medians = [Float]()

    // maxHeap stores the smallest half seen so far, and minHeap the largest half seen so far.
    // We keep both heaps balanced so that maxHeap contains either as many values as minHeap, or one
    // more value than minHeap.
    let maxHeap = Heap<Int>(higherPriority: >)
    let minHeap = Heap<Int>(higherPriority: <)

    for value in values {
        if let m = maxHeap.highestPriority {
            if value < m {
                maxHeap.insert(value)
            } else {
                minHeap.insert(value)
            }
            rebalance(maxHeap, minHeap)
        } else {
            maxHeap.insert(value)
        }
        medians.append(median(maxHeap, minHeap))
    }

    return medians
}
