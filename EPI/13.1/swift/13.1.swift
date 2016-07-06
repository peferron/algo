public func anagrams(words: [String]) -> [[String]] {
    var sortedWordToAnagrams = [String: [String]]()

    for word in words {
        let sortedWord = String(word.characters.sort(<))

        if sortedWordToAnagrams[sortedWord] == nil {
            sortedWordToAnagrams[sortedWord] = [word]
        } else {
            sortedWordToAnagrams[sortedWord]!.append(word)
        }
    }

    let result = sortedWordToAnagrams.values.filter { $0.count > 1 }
    return [[String]](result)
}
