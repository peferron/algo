public func shortestProductionSequenceLength(from src: String, to dst: String, in dict: inout Set<String>) -> Int? {
    if !dict.contains(src) {
        return nil
    }

    var queue = ArraySlice([(string: src, distance: 1)])

    while let (string, distance) = queue.popFirst() {
        if string == dst {
            return distance
        }

        dict.remove(string)

        for neighbor in dict where adjacent(string, neighbor) {
            queue.append((neighbor, distance + 1))
        }
    }

    return nil
}

private func adjacent(_ str1: String, _ str2: String) -> Bool {
    let chars1 = str1.characters
    let chars2 = str2.characters

    return chars1.count == chars2.count &&
        zip(chars1, chars2).filter { (char1, char2) in char1 != char2 }.count == 1
}
