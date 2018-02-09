// O(n) where n is the number of digits in base 10 of the provided number.
public func reverse(_ number: Int) -> Int {
    var n = abs(number)
    var reversed = 0

    while n != 0 {
        reversed = reversed * 10 + n % 10
        n /= 10
    }

    return number < 0 ? -reversed : reversed
}
