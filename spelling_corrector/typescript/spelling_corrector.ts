type CodePoint = string;

export default class SpellingCorrector {
    private counts = new Map<string, number>();
    private alphabet: CodePoint[];

    constructor(alphabet: string, private maxDistance: number) {
        this.alphabet = [...alphabet];
    }

    train(word: string): void {
        const w = word.toLowerCase();
        const count = this.counts.get(w) || 0;
        this.counts.set(w, count + 1);
    }

    private candidates(word: string): string[] {
        for (let distance = 0; distance <= this.maxDistance; distance += 1) {
            const edits = editsN(word, this.alphabet, distance).filter(w => this.counts.has(w));
            if (edits.length > 0) {
                return edits;
            }
        }
        return [word];
    }

    correct(word: string): string {
        return this.candidates(word.toLowerCase()).reduce((best, candidate) =>
            this.counts.get(candidate)! > this.counts.get(best)! ? candidate : best
        );
    }
}

const editsN = (word: string, alphabet: CodePoint[], distance: number) =>
    iter(0, distance)
        .reduce(result => dedup(flatten(result.map(w => edits1(w, alphabet)))), [[...word]])
        .map(join);

const edits1 = (word: CodePoint[], alphabet: CodePoint[]) => dedup([
    ...deletes(word),
    ...transposes(word),
    ...replaces(word, alphabet),
    ...inserts(word, alphabet),
]);

const deletes = (w: CodePoint[]) =>
    iter(0, w.length).map(i => [...w.slice(0, i), ...w.slice(i + 1)]);

const transposes = (w: CodePoint[]) =>
    iter(0, w.length - 1).map(i => [...w.slice(0, i), w[i + 1], w[i], ...w.slice(i + 2)]);

const replaces = (w: CodePoint[], alphabet: CodePoint[]) =>
    flatten(alphabet.map(letter =>
        iter(0, w.length).map(i => [...w.slice(0, i), letter, ...w.slice(i + 1)])
    ));

const inserts = (w: CodePoint[], alphabet: CodePoint[]) =>
    flatten(alphabet.map(letter =>
        iter(0, w.length + 1).map(i => [...w.slice(0, i), letter, ...w.slice(i)])
    ));

const flatten = (a: any[]) => [].concat(...a);

const iter = (from: number, to: number) => Array.from({length: to - from}, (_, i) => from + i);

const dedup = (words: CodePoint[][]) => [...new Set(words.map(join))].map(w => [...w]);

const join = (w: CodePoint[]) => w.join('');
