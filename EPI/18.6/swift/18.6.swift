public func majorityElement(_ strings: [String]) -> String {
    var candidate: String!
    var count = 0

    for string in strings {
        if count == 0 {
            candidate = string
            count = 1
        } else if candidate == string {
            count += 1
        } else {
            count -= 1
        }
    }

    return candidate
}


// In average, less than two random picks are necessary to pick the majority element. Each pick is
// tested in O(n) time. This leads to an overall O(n) average time complexity, with O(1) space
// complexity (assuming that Swift lazy filters do not allocate a new array; otherwise, use a loop).
public func majorityElementRandom(_ strings: [String]) -> String {
    while true {
        let index = Int(arc4random_uniform(UInt32(strings.count)))
        let string = strings[index]

        let occurrences = strings.lazy.filter { $0 == string }.count

        if occurrences > strings.count / 2 {
            return string
        }
    }
}
