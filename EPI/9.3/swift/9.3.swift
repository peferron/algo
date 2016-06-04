public func wellFormed(string: String) -> Bool {
    var opened = [Character]()

    for character in string.characters {
        switch character {
        case "{", "[", "(":
            opened.append(character)
        case "}":
            guard let last = opened.popLast() where last == "{" else {
                return false
            }
        case "]":
            guard let last = opened.popLast() where last == "[" else {
                return false
            }
        case ")":
            guard let last = opened.popLast() where last == "(" else {
                return false
            }
        default:
            break
        }
    }

    return opened.isEmpty
}
