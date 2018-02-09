public func anagrams(_ words: [String]) -> [[String]] {
    var sortedWordToAnagrams = [String: [String]]()

    for word in words {
        let sortedWord = String(word.characters.sorted(by: <))

        if sortedWordToAnagrams[sortedWord] == nil {
            sortedWordToAnagrams[sortedWord] = [word]
        } else {
            sortedWordToAnagrams[sortedWord]!.append(word)
        }
    }

    let result = sortedWordToAnagrams.values.filter { $0.count > 1 }
    return [[String]](result)
}
