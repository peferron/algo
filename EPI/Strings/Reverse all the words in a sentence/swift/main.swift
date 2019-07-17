// swiftlint:disable variable_name

public func reverseWordsSimple(_ characters: inout [Character]) {
    characters = characters.split(separator: " ").reversed().joined(separator: [" "]).compactMap { $0 }
}

public func reverseWordsSmart(_ characters: inout [Character]) {
    // In the first pass, reverse the characters of the string ("ab cd" -> "dc ba").
    reverse(&characters, range: 0..<characters.count)

    // In the second pass, reverse each word back to its original form ("dc ba" -> "cd ab").
    var readIndex = 0
    while let wordRange = rangeOfNextWord(characters, startIndex: readIndex) {
        reverse(&characters, range: wordRange)
        readIndex = wordRange.upperBound
    }
}

func reverse(_ characters: inout [Character], range: Range<Int>) {
    for i in 0..<range.count / 2 {
        swap(&characters, range.lowerBound + i, range.upperBound - 1 - i)
    }
}

func swap(_ array: inout [Character], _ i: Int, _ j: Int) {
    (array[i], array[j]) = (array[j], array[i])
}

func rangeOfNextWord(_ characters: [Character], startIndex: Int) -> Range<Int>? {
    let wordStartIndex = characters[startIndex..<characters.count].firstIndex { $0 != " " }
    if wordStartIndex == nil {
        return nil
    }

    let spaceStartIndex = characters[wordStartIndex!..<characters.count].firstIndex(of: " ")
    if spaceStartIndex == nil {
        return wordStartIndex!..<characters.count
    }

    return wordStartIndex!..<spaceStartIndex!
}
