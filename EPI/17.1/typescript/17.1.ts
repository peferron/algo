// This is a variation on the book solution. Rather than computing combinations for all integer
// sub-scores from 0 to score, it uses recursion to only compute the sub-scores that are reachable
// using a combination of the previous plays.
// It's likely much faster for inputs such as score = 10000 and plays = [2000, 3000].

export default function combinations(score: number, plays: number[]): number {
    const cache = plays.map(() => new Map<number, number>());
    return combinationsRec(score, plays, 0, cache);
}

function combinationsRec(
    score: number,
    plays: number[],
    firstPlayIndex: number,
    cache: Map<number, number>[]
): number {
    const firstPlay = plays[firstPlayIndex];
    let remainingScore = score;
    let result = 0;

    while (remainingScore >= 0) {
        let remainingCombinations: number;

        if (firstPlayIndex === plays.length - 1) {
            remainingCombinations = remainingScore === 0 ? 1 : 0;
        } else {
            const map = cache[firstPlayIndex];
            if (!map.has(remainingScore)) {
                map.set(
                    remainingScore,
                    combinationsRec(remainingScore, plays, firstPlayIndex + 1, cache)
                );
            }
            remainingCombinations = map.get(remainingScore)!;
        }

        result += remainingCombinations;
        remainingScore -= firstPlay;
    }

    return result;
}
