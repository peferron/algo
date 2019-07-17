public func distance(_ sa: String, _ sb: String) -> Int {
    let a = [Character](sa)
    let b = [Character](sb)

    // distances[i][j] is the distance between the substring formed using the i first characters of
    // a, and the substring formed using the j first characters of b.
    var distances = [[Int]](repeating: [Int](repeating: 0, count: b.count), count: a.count)

    // Initialize the simple case where one of the substrings is empty.
    for i in 0..<a.count {
        distances[i][0] = i
    }
    for j in 0..<b.count {
        distances[0][j] = j
    }

    // Fill the other cases using dynamic programming.
    for i in 1..<a.count {
        for j in 1..<b.count {
            // Find the distance between a[0...i] and b[0...j].

            // If a[i] and b[j] are equal, then the distance is the same as between a[0...i-1] and
            // b[0...j-1].
            if a[i] == b[j] {
                distances[i][j] = distances[i - 1][j - 1]
                continue
            }

            // a[i] and b[j] are different. When transforming a[0...i] into b[0...j], how can we end
            // up with b[j] in the last position as it should?

            // - Using an insertion: transform a[0...i] into b[0...j-1] and then insert b[j].
            let insertionDistance = distances[i][j - 1] + 1

            // - Using a deletion: transform a[0...i-1] into b[0...j] and then delete a[i].
            let deletionDistance = distances[i - 1][j] + 1

            // - Using a substitution: transform a[0...i-1] into b[0...j-1] and then substitute a[i]
            //   with b[j].
            let substitutionDistance = distances[i - 1][j - 1] + 1

            // The final distance is the minimum of all the distances computed above.
            distances[i][j] = min(insertionDistance, deletionDistance, substitutionDistance)
        }
    }

    return distances.last!.last!
}
