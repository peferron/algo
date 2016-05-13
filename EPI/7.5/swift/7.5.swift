// swiftlint:disable variable_name

func isAlphanumeric(character: Character) -> Bool {
    return "0" <= character && character <= "9" ||
        "a" <= character && character <= "z" ||
        "A" <= character && character <= "Z"
}

func caseInsensitiveEquals(a: Character, _ b: Character) -> Bool {
    return String(a).lowercaseString == String(b).lowercaseString
}

public func isPalindrome(string: String) -> Bool {
    guard string != "" else {
        return true
    }

    // Iterate from both ends of the string towards the center. Non-alphanumeric characters are
    // skipped, and alphanumeric characters are compared case-insensitively.
    var start = string.startIndex
    var end = string.endIndex.predecessor()

    while true {
        while start < end && !isAlphanumeric(string[start]) {
            start = start.successor()
        }

        while start < end && !isAlphanumeric(string[end]) {
            end = end.predecessor()
        }

        guard start < end else {
            return true
        }

        guard caseInsensitiveEquals(string[start], string[end]) else {
            return false
        }

        start = start.successor()
        end = end.predecessor()
    }
}
