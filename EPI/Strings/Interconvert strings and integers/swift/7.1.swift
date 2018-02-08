let minus = UnicodeScalar("-").value
let zero = UnicodeScalar("0").value

public func toString(_ number: Int) -> String {
    let s = toString(UInt(abs(number)))
    return number >= 0 ? s : "-" + s
}

public func toString(_ number: UInt) -> String {
    if number == 0 {
        return "0"
    }

    var s = ""
    var n = number

    while n > 0 {
        s += String(UnicodeScalar(zero + UInt32(n % 10))!)
        n /= 10
    }

    return String(s.reversed())
}

public func toInt(_ string: String) -> Int {
    var negative = false
    var n = 0

    for scalar in string.unicodeScalars {
        if scalar.value == minus {
            negative = true
        } else {
            n = n * 10 + Int(scalar.value - zero)
        }
    }

    return negative ? -n : n
}
