public func canFormPalindrome(_ string: String) -> Bool {
    var oddCharacters = Set<Character>()

    for character in string {
        if oddCharacters.contains(character) {
            oddCharacters.remove(character)
        } else {
            oddCharacters.insert(character)
        }
    }

    return oddCharacters.count <= 1
}
