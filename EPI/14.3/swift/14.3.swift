public typealias Occurrences = (character: Character, count: Int)

public func occurrences(_ string: String) -> [Occurrences] {
    let sortedChars = string.characters.sorted(by: <)
    var result = [Occurrences]()

    for char in sortedChars {
        if let last = result.last, last.character == char {
            result[result.count - 1].count += 1
        } else {
            result.append((char, 1))
        }
    }

    return result
}
