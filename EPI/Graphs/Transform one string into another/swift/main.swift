public func shortestProductionSequenceLength(from src: String, to dst: String, in dict: inout Set<String>) -> Int? {
    if !dict.contains(src) {
        return nil
    }

    var queue = ArraySlice([(string: src, distance: 1)])

    while let (string, distance) = queue.popFirst() {
        if string == dst {
            return distance
        }

        for neighbor in dict where adjacent(string, neighbor) {
            queue.append((neighbor, distance + 1))
            dict.remove(neighbor)
        }
    }

    return nil
}

private func adjacent(_ str1: String, _ str2: String) -> Bool {
    return str1.count == str2.count &&
        zip(str1, str2).filter { (char1, char2) in char1 != char2 }.count == 1
}
