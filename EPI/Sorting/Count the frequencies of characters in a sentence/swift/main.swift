public typealias Occurrences = (character: Character, count: Int)

public func occurrences(_ string: String) -> [Occurrences] {
    let sortedChars = string.sorted(by: <)
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

// The book says that sorting the string directly doesn't use additional space, but it does, since
// it allocates a new array of chars, which is linear with string length. Using dictionary, on the
// other hand, only takes space linear with the number of distinct chars, which is bounded by some
// constant (although this constant will be very high for e.g. Chinese). Also, in Swift, iterating
// the string is lazy and does not allocate a new array.
/*
public func occurrences(_ string: String) -> [(Character, Int)] {
    var counts = [Character: Int]()

    for char in string {
        let count = counts[char] ?? 0
        counts[char] = count + 1
    }

    return counts.sorted { $0.0 < $1.0 }
}
*/
