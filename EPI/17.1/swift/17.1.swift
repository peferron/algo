/*
 * PUBLIC SERVICE ANNOUNCEMENT
 *
 * Re-reading this code 4 months later, I have absolutely no idea how I could ever write this.
 * It only solves the problem for the values used as examples in the book (2, 3 and 7), and manages
 * to still be overcomplicated.
 *
 * Look at the TypeScript version instead.
 *
 */

public typealias Combination = (safeties: Int, goals: Int, touchdowns: Int)

public func combinations(score: Int) -> [Combination] {
    var computedCombinations = [
        // The base case is for score == 0.
        [(safeties: 0, goals: 0, touchdowns: 0)]
    ]

    for s in stride(from: 1, through: score, by: 1) {
        // We can reach s by adding 1 safety to all combinations for s-2.
        let safetyCombinations = s < 2 ? [] :
            computedCombinations[s - 2].map {
                ($0.safeties + 1, $0.goals, $0.touchdowns)
            }

        // We can reach s by adding 1 goal to all combinations for s-3.
        // To avoid duplicates, we ignore the combinations for s-3 that have 1 or more safeties.
        // That's because the combination for s (safeties: i, goals: j, touchdowns: k) has already
        // been added to computedCombinations previously, by adding 1 safety to the combination for
        // s-2 (safeties: i-1, goals: j, touchdowns: k). Adding 1 goal to the combination for s-3
        // (safeties: i, goals: j-1, touchdowns: k) results in the same combination.
        let goalCombinations = s < 3 ? [] :
            computedCombinations[s - 3].flatMap {
                $0.safeties == 0 ? ($0.safeties, $0.goals + 1, $0.touchdowns) : nil
            }

        // We can reach s by adding 1 touchdown to all combinations for s-7.
        // Just like above, to avoid duplicates we ignore the combinations for s-7 that have 1 or
        // more safeties or goals.
        let touchdownCombinations = s < 7 ? [] :
            computedCombinations[s - 7].flatMap {
                $0.safeties == 0 && $0.goals == 0 ? ($0.safeties, $0.goals, $0.touchdowns + 1) : nil
            }

        computedCombinations.append(safetyCombinations + goalCombinations + touchdownCombinations)
    }

    return computedCombinations[score]
}

public func combinationsCount(score: Int) -> Int {
    // How many combinations of twos can reach a given score?
    var countsUsingTwos = [Int]()
    for s in 0...score {
        // If s is even, there is exactly one combination of twos reaching s: s/2 twos.
        // If s is off, there are no combinations of twos reaching s.
        countsUsingTwos.append(s % 2 == 0 ? 1 : 0)
    }

    // How many combinations of twos and threes can reach a given score?
    var countsUsingTwosAndThrees = [Int]()
    for s in 0...score {
        // The combinations of twos and threes reaching s can be split in two subsets:
        // - The combinations containing only twos. Their count has already been computed in
        //   countsUsingTwos[s].
        // - The combinations containing at least one three. These combinations can be constructed
        //   by adding one three to each combination of twos and threes reaching s-3, so their count
        //   is identical to countsUsingTwosAndThrees[s-3].
        let countUsingTwos = countsUsingTwos[s]
        let countUsingAtLeastOneThree = s >= 3 ? countsUsingTwosAndThrees[s - 3] : 0
        countsUsingTwosAndThrees.append(countUsingTwos + countUsingAtLeastOneThree)
    }

    // How many combinations of twos, threes and sevens can reach a given score?
    var countsUsingTwosAndThreesAndSevens = [Int]()
    for s in 0...score {
        // Same logic as in the previous loop.
        let countUsingTwosAndThrees = countsUsingTwosAndThrees[s]
        let countUsingAtLeastOneSeven = s >= 7 ? countsUsingTwosAndThreesAndSevens[s - 7] : 0
        countsUsingTwosAndThreesAndSevens.append(countUsingTwosAndThrees + countUsingAtLeastOneSeven)
    }

    return countsUsingTwosAndThreesAndSevens[score]
}
