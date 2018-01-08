import Darwin

let tests: [(src: String, dst: String, dict: [String], shortestLength: Int?)] = [
    (
       src: "a",
       dst: "a",
       dict: ["a"],
       shortestLength: 1
    ),
    (
       src: "a",
       dst: "a",
       dict: [],
       shortestLength: nil
    ),
    (
       src: "a",
       dst: "b",
       dict: ["a", "b"],
       shortestLength: 2
    ),
    (
       src: "a",
       dst: "b",
       dict: ["a", "c"],
       shortestLength: nil
    ),
    (
       src: "ab",
       dst: "cd",
       dict: ["ab", "cb", "abc", "bc", "cd"],
       shortestLength: 3
    ),
    (
       src: "ab",
       dst: "bc",
       dict: ["ab", "cb", "abc", "bc", "cd"],
       shortestLength: nil
    ),
    (
       src: "cat",
       dst: "dog",
       dict: ["bat", "cot", "dog", "dag", "dot", "cat"],
       shortestLength: 4
    ),
]

for test in tests {
    var dict = Set(test.dict)
    let actual = shortestProductionSequenceLength(from: test.src, to: test.dst, in: &dict)

    guard actual == nil && test.shortestLength == nil ||
        actual != nil && test.shortestLength != nil && actual! == test.shortestLength! else {
        print("For src \(test.src), dst \(test.dst), and dict \(test.dict), " +
            "expected length of shortest production sequence to be " +
            "\(String(describing: test.shortestLength)), but was \(String(describing: actual))")
        exit(1)
    }
}
