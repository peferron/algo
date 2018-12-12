// swiftlint:disable variable_name

class Heap<T> {
    let higherPriority: (T, T) -> Bool
    private var array = [T]()

    init(higherPriority: @escaping (T, T) -> Bool) {
        self.higherPriority = higherPriority
    }

    var count: Int {
        return array.count
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

public typealias Coordinates = (x: Int, y: Int, z: Int)

func squareDistanceFromOrigin(_ coordinates: Coordinates) -> Int {
    let (x, y, z) = coordinates
    return x * x + y * y + z * z
}

func further(_ a: Coordinates, than b: Coordinates) -> Bool {
    return squareDistanceFromOrigin(a) > squareDistanceFromOrigin(b)
}

public func closest(stars: [Coordinates], count: Int) -> [Coordinates] {
    let maxHeap = Heap(higherPriority: further)

    for star in stars {
        // We could simply insert a star and then remove the furthest star if the heap contains more
        // than count stars. But we can slightly optimize this by, once the heap is full, only
        // inserting a star if it is closer than the furthest star in the heap.
        // This reduces the time complexity from O(n log k) to O(n + k log k log n).
        // Note that if we built a heap containing all stars, the time complexity would be O(n) to
        // build the heap then O(k log n) to remove the k closest stars, for a total of
        // O(n + k log n). However this exercise assumes that there are too many stars to build a
        // heap containing all of them.
        if maxHeap.count < count {
            maxHeap.insert(star)
        } else if further(maxHeap.highestPriority!, than: star) {
            _ = maxHeap.removeHighestPriority()
            maxHeap.insert(star)
        }
    }

    var closest = [Coordinates]()

    while let star = maxHeap.removeHighestPriority() {
        closest.append(star)
    }

    return closest
}
