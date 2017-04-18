export default function isPalindromePermutation(str: string): boolean {
    const oddChars = new Set<string>();

    for (const char of str) {
        if (oddChars.has(char)) {
            oddChars.delete(char);
        } else {
            oddChars.add(char);
        }
    }

    return oddChars.size <= 1;
}
