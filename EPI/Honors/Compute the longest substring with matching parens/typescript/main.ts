export default function longestMatch(s: string): number {
    let maxLen = 0;
    let end = -1;
    const leftParensIndexes: number[] = [];

    for (let i = 0; i < s.length; i += 1) {
        if (s.charAt(i) === '(') {
            leftParensIndexes.push(i);
        } else if (!leftParensIndexes.length) {
            end = i;
        } else {
            leftParensIndexes.pop();
            const start = leftParensIndexes.length ? leftParensIndexes[leftParensIndexes.length - 1] : end;
            maxLen = Math.max(maxLen, i - start);
        }
    }

    return maxLen;
}
