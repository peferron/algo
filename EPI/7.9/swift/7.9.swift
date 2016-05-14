let romanValues: [Character: Int] = [
    "M": 1000,
    "D": 500,
    "C": 100,
    "L": 50,
    "X": 10,
    "V": 5,
    "I": 1,
]

public func toInt(roman roman: String) -> Int {
    var max = 0
    var sum = 0

    for character in roman.characters.reverse() {
        let value = romanValues[character]!
        if value < max {
            sum -= value
        } else {
            sum += value
            max = value
        }
    }

    return sum

    // Alternative below, that takes 40s to compile with Swift 2.2. Can be made faster by splitting
    // the chain into pieces, but hopefully it'll be fixed in a future version of the compiler.
    // return roman
    //     .characters
    //     .lazy
    //     .reverse()
    //     .map { romanValues[$0]! }
    //     .reduce((sum: 0, max: 0)) { (acc, value) in
    //         value < acc.max ? (acc.sum - value, acc.max) : (acc.sum + value, value)
    //     }
    //     .sum
}
