export default function lengthOfLongestNondecreasingSubsequence(values: number[]): number {
    // maxLengths[i] is the length of the longest nondecreasing subsequence ending with values[i].
    const maxLengths: number[] = [];

    for (const [i, v] of values.entries()) {
        let maxPrefixLength = 0;

        for (let j = 0; j < i; j += 1) {
            if (values[j] <= v) {
                maxPrefixLength = Math.max(maxPrefixLength, maxLengths[j]);
            }
        }

        maxLengths.push(maxPrefixLength + 1);
    }

    return maxLengths.reduce((a, b) => Math.max(a, b), 0);
}
