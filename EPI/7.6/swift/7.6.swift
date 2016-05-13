// swiftlint:disable variable_name

public func reverseWordsSimple(inout characters: [Character]) {
    characters = characters.split(" ").reverse().joinWithSeparator([" "]).flatMap { $0 }
}

public func reverseWordsSmart(inout characters: [Character]) {
    // In the first pass, reverse the characters of the string ("ab cd" -> "dc ba").
    reverse(&characters, range: 0..<characters.count)

    // In the second pass, reverse each word back to its original form ("dc ba" -> "cd ab").
    var readIndex = 0
    while let wordRange = rangeOfNextWord(characters, startIndex: readIndex) {
        reverse(&characters, range: wordRange)
        readIndex = wordRange.endIndex
    }
}

func reverse(inout characters: [Character], range: Range<Int>) {
    for i in 0..<range.count / 2 {
        swap(&characters, range.startIndex + i, range.endIndex - 1 - i)
    }
}

func swap(inout array: [Character], _ i: Int, _ j: Int) {
    (array[i], array[j]) = (array[j], array[i])
}

func rangeOfNextWord(characters: [Character], startIndex: Int) -> Range<Int>? {
    guard startIndex < characters.count else {
        return nil
    }

    let wordStartIndex = characters[startIndex..<characters.count].indexOf { $0 != " " }
    if wordStartIndex == nil {
        return nil
    }

    let spaceStartIndex = characters[wordStartIndex!..<characters.count].indexOf(" ")
    if spaceStartIndex == nil {
        return wordStartIndex!..<characters.count
    }

    return wordStartIndex!..<spaceStartIndex!
}
