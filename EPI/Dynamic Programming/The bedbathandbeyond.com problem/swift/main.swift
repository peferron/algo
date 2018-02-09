public func decompose(_ name: String, dictionary: Set<String>) -> [String]? {
    // decompositions[k] is the decomposition of the substring formed using the last k characters of
    // of name, or nil if this substring has no decomposition.
    // The base case is the empty substring, which maps to the empty decomposition.
    var decompositions: [Int: [String]?] = [0: []]

    return decompose(name.characters, dictionary: dictionary, decompositions: &decompositions)
}

private func decompose(_ name: String.CharacterView, dictionary: Set<String>, decompositions: inout [Int: [String]?]) -> [String]? {
    // Check if the result is cached.
    if let decomposition = decompositions[name.count] {
        return decomposition
    }

    var decomposition: [String]?

    for i in name.indices {
        let prefix = String(name.prefix(through: i))
        if !dictionary.contains(prefix) {
            continue
        }

        let suffix = name.suffix(from: name.index(after: i))
        if let suffixDecomposition = decompose(suffix, dictionary: dictionary, decompositions: &decompositions) {
            decomposition = [prefix] + suffixDecomposition
            break
        }
    }

    // Cache the result.
    decompositions[name.count] = decomposition

    return decomposition
}
