// "a" becomes "dd", "b" is removed.
public func replaceAndRemove(inout characters: [Character], count: Int) -> Int {
    // The first pass removes "b" and counts "a".
    let (aCount, bCount) = removeB(&characters, count: count)

    // After the first pass, there are (count - bCount) characters that still matter.
    // The second pass goes backwards from there, replacing "a" with "dd".
    replaceA(&characters, count: count - bCount, aCount: aCount)

    return count - bCount + aCount
}

func removeB(inout characters: [Character], count: Int) -> (Int, Int) {
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

    return (aCount, bCount)
}

func replaceA(inout characters: [Character], count: Int, aCount: Int) {
    var remainingACount = aCount

    for i in (0..<count).reverse() {
        let character = characters[i]
        if character == "a" {
            characters[i + remainingACount] = "d"
            characters[i + remainingACount - 1] = "d"
            remainingACount -= 1
        } else {
            characters[i + remainingACount] = character
        }
    }
}
