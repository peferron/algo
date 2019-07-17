// swiftlint:disable variable_name

func isAlphanumeric(_ character: Character) -> Bool {
    return "0" <= character && character <= "9" ||
        "a" <= character && character <= "z" ||
        "A" <= character && character <= "Z"
}

public func isPalindromeSimple(_ string: String) -> Bool {
    let cleanedCharacters = string.lowercased().filter(isAlphanumeric)
    return cleanedCharacters == String(cleanedCharacters.reversed())
}

public func isPalindromeSmart(_ string: String) -> Bool {
    guard string != "" else {
        return true
    }

    // Iterate from both ends of the string towards the center. Non-alphanumeric characters are
    // skipped, and alphanumeric characters are compared case-insensitively.
    var start = string.startIndex
    var end = string.index(before: string.endIndex)

    while true {
        while start < end && !isAlphanumeric(string[start]) {
            start = string.index(after: start)
        }

        while start < end && !isAlphanumeric(string[end]) {
            end = string.index(before: end)
        }

        guard start < end else {
            return true
        }

        guard String(string[start]).lowercased() == String(string[end]).lowercased() else {
            return false
        }

        start = string.index(after: start)
        end = string.index(before: end)
    }
}
