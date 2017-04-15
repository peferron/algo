export default function groupAnagrams(words: string[]): string[][] {
    const sortedMap = new Map<string, string[]>();

    for (const word of words) {
        const sortedWord = sort(word);

        if (!sortedMap.has(sortedWord)) {
            sortedMap.set(sortedWord, []);
        }

        sortedMap.get(sortedWord)!.push(word);
    }

    return [...sortedMap.values()].filter(group => group.length > 1);
}

function sort(s: string): string {
    return [...s].sort().join('');
}
