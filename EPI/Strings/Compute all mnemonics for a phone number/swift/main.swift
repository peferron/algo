let digitMnemonics: [Character: [Character]] = [
    "0": ["0"],
    "1": ["1"],
    "2": ["A", "B", "C"],
    "3": ["D", "E", "F"],
    "4": ["G", "H", "I"],
    "5": ["J", "K", "L"],
    "6": ["M", "N", "O"],
    "7": ["P", "Q", "R", "S"],
    "8": ["T", "U", "V"],
    "9": ["W", "X", "Y", "Z"],
]

public func mnemonicsIterative(number: String) -> [String] {
    let choices = number.characters.map { digitMnemonics[$0]! }
    return combinations(choices).map { String($0) }
}

// combinations takes an array of choices for each position, and returns an array of all possible
// combinations. We return a lazy collection for demonstration purposes; it's not very useful here,
// since mnemonicsIterative will read the entire collection anyway. But we can easily imagine a
// scenario where we only want to show e.g. the first 10 combinations, or want to compute
// combinations chunk by chunk to avoid blocking the system when the number is long.
func combinations<T>(_ choices: [[T]]) -> LazyMapCollection<CountableRange<Int>, [T]> {
    let combinationCount = choices.reduce(1) { $0 * $1.count }
    return (0..<combinationCount).lazy.map { combination(choices, index: $0) }
}

// combination takes an array of choices for each position, and returns the nth combination.
func combination<T>(_ choices: [[T]], index combinationIndex: Int) -> [T] {
    var combination = [T]()
    var scaledCombinationIndex = combinationIndex

    for choice in choices {
        combination.append(choice[scaledCombinationIndex % choice.count])
        scaledCombinationIndex /= choice.count
    }

    return combination
}

public func mnemonicsRecursive(_ number: String) -> [String] {
    return mnemonicsRec(number.characters).map { String($0) }
}

func mnemonicsRec(_ number: String.CharacterView) -> [[Character]] {
    if number.isEmpty {
        return [[]]
    }

    let currentMnemonics = digitMnemonics[number.first!]!
    let nextMnemonics = mnemonicsRec(number.dropFirst(1))

    return nextMnemonics.flatMap { next in
        currentMnemonics.map { current in
            [current] + next
        }
    }
}
