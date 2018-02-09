// swiftlint:disable variable_name

public func primes(max n: Int) -> [Int] {
    var eliminated = [Bool](count: n + 1, repeatedValue: false)
    var result = [Int]()

    for i in 2.stride(through: n, by: 1) {
        if eliminated[i] {
            continue
        }

        // i is prime.
        result.append(i)

        // Eliminate multiples of i, starting from i * i. (All lower multiples k * i where k < i
        // have been eliminated when k was processed.)
        // Note that we only need to run this step when i is prime; otherwise it means that i has
        // a divisor d where d < i, which has already been processed before. For example we do not
        // need to eliminate multiples of 4 because all multiples of 2 have already been eliminated.
        for multiple in (i * i).stride(through: n, by: i) {
            eliminated[multiple] = true
        }
    }

    return result
}
