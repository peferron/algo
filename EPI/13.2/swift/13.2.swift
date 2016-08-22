public func canFormPalindrome(string: String) -> Bool {
    var oddCharacters = Set<Character>()

    for character in string.characters {
        if oddCharacters.contains(character) {
            oddCharacters.remove(character)
        } else {
            oddCharacters.insert(character)
        }
    }

    return oddCharacters.count <= 1
}
