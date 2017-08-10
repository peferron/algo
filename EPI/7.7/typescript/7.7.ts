export default function getWords(number: string, characters: Map<string, string[]>): string[] {
    let words = [''];

    for (const digit of number) {
        words = flatten(characters.get(digit)!.map(char => words.map(word => word + char)));
    }

    return words;
}

const flatten = <T>(arrays: T[][]) => Array.prototype.concat(...arrays);
