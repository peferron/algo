// TO(n) where n is the number of digits of number in base 10.
public func isPalindromeReverse(number: Int) -> Bool {
    if number < 0 {
        return false
    }

    return reverse(number) == number
}

func reverse(number: Int) -> Int {
    var n = number
    var r = 0

    while n > 0 {
        r = r &* 10 &+ n % 10 // Use overflow operators to prevent errors.
        n /= 10
    }

    return r
}

// Also O(n). Compared to isPalindromeReverse, the advantage is that it returns false on the first
// failed comparison, but the disadvantage is that calling the log10 function is expensive. Both
// functions perform roughly the same when benchmarked against random integers.
public func isPalindromeLog(number: Int) -> Bool {
    if number <= 0 {
        return number == 0
    }

    var digits = Int(log10(Double(number))) + 1
    var n = number

    while digits > 1 {
        // Get the most significant digit.
        let lowerPowerOf10 = Int(pow(10, Double(digits - 1)))
        let mostSignificantDigit = n / lowerPowerOf10

        // Compare with the least significant digit.
        if mostSignificantDigit != n % 10 {
            return false
        }

        // Remove most and least significant digits.
        n = (n - mostSignificantDigit * lowerPowerOf10) / 10
        digits -= 2
    }

    return true
}
