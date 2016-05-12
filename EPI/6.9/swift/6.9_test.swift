import Darwin

let tests: [(max: Int, primes: [Int])] = [
    (max: -1, primes: []),
    (max: -0, primes: []),
    (max: 1, primes: []),
    (max: 2, primes: [2]),
    (max: 4, primes: [2, 3]),
    (max: 20, primes: [2, 3, 5, 7, 11, 13, 17, 19]),
]

for test in tests {
    var actual = primes(max: test.max)
    guard actual == test.primes else {
        print("For max \(test.max), expected primes to be \(test.primes), but was \(actual)")
        exit(1)
    }
}
