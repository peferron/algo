// swiftlint:disable variable_name

public func lookAndSay(index n: Int) -> String {
    var sequence: [Character] = ["1"]

    for _ in stride(from: 1, through: n, by: 1) {
        sequence = next(sequence)
    }

    return String(sequence)
}

func next(_ sequence: [Character]) -> [Character] {
    var nextSequence = [Character]()
    var streakCount = 1
    var streakCharacter = sequence.first!

    for character in sequence.dropFirst(1) {
        if character == streakCharacter {
            streakCount += 1
        } else {
            nextSequence += String(streakCount).characters + [streakCharacter]
            streakCharacter = character
            streakCount = 1
        }
    }

    // Append the final streak.
    nextSequence += String(streakCount).characters + [streakCharacter]

    return nextSequence
}
