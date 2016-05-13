// "a" becomes "dd", "b" is removed.
public func replaceAndRemove(inout characters: [Character], count: Int) -> Int {
    // The first pass removes "b" and counts "a".
    var aCount = 0
    var bCount = 0
    for i in 0..<count {
        let character = characters[i]
        if character == "b" {
            bCount += 1
        } else {
            if character == "a" {
                aCount += 1
            }
            characters[i - bCount] = characters[i]
        }
    }

    let finalCount = count - bCount + aCount

    // After the first pass, there are (count - bCount) characters that still matter.
    // The second pass goes backwards from there, replacing "a" with "dd".
    for i in (0..<count - bCount).reverse() {
        let character = characters[i]
        if character == "a" {
            characters[i + aCount] = "d"
            characters[i + aCount - 1] = "d"
            aCount -= 1
        } else {
            characters[i + aCount] = character
        }
    }

    return finalCount
}
