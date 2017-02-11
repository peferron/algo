import Darwin

if #available(OSX 10.10, *) {
    let expected = [Int](0..<100)
    let actual = generateNumbersParallel(from: 0, to: 100)

    guard actual == expected else {
        print("Expected numbers from 0 to 100 but got \(actual)")
        exit(1)
    }
} else {
    print("Requires OS X 10.10 or newer")
    exit(1)
}
