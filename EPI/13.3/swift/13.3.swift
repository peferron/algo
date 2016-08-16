let ignored: Set<Character> = ["\0", "\t", "\n", "\r", " "]

public func constructible(letter: String, magazine: String) -> Bool {
    // We can process either the letter or magazine first. Which one is faster will depend on the
    // contents of the letter and the magazine. If the typical use case is a short letter that can
    // be confirmed as constructible using just the first few pages of a long magazine, then it's
    // better to process the letter first, and then stop processing the magazine as soon as we got
    // all the characters we need.

    var required = [Character : Int]()

    for char in letter.characters where !ignored.contains(char) {
        required[char] = (required[char] ?? 0) + 1
    }

    if required.isEmpty {
        return true
    }

    for char in magazine.characters {
        if let r = required[char] {
            required[char] = r == 1 ? nil : r - 1
            if required.isEmpty {
                return true
            }
        }
    }

    return false
}
