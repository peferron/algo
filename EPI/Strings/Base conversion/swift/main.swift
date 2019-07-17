// swiftlint:disable variable_name

let minus = UnicodeScalar("-").value
let zero = UnicodeScalar("0").value
let A = UnicodeScalar("A").value

func toInt(string: String, base: Int) -> Int {
    var negative = false
    var n = 0

    for scalar in string.unicodeScalars {
        if scalar.value == minus {
            negative = true
        } else {
            n = n * base + Int(scalar.value >= A ? 10 + scalar.value - A : scalar.value - zero)
        }
    }

    return negative ? -n : n
}

func toString(number: Int, base: Int) -> String {
    let s = toString(number: UInt(abs(number)), base: base)
    return number >= 0 ? s : "-" + s
}

func toString(number: UInt, base: Int) -> String {
    if number == 0 {
        return "0"
    }

    var s = ""
    var n = number

    while n > 0 {
        let remainder = UInt32(n % UInt(base))
        s += String(UnicodeScalar(remainder < 10 ? zero + remainder : A + remainder - 10)!)
        n /= UInt(base)
    }

    return String(s.reversed())
}

public func convert(number: String, fromBase b1: Int, toBase b2: Int) -> String {
    let int = toInt(string: number, base: b1)
    return toString(number: int, base: b2)
}
