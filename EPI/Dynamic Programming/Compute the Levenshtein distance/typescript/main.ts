export default function distance(a: string | string[], b: string | string[]): number {
    const [as, bs] = [a, b].map(s => Array.isArray(s) ? s : [...s]);
    const distances = Array.from({length: as.length + 1}, () => new Array(bs.length + 1).fill(NaN));

    for (let i = as.length; i >= 0; i -= 1) {
        for (let j = bs.length; j >= 0; j -= 1) {
            if (i === as.length) {
                distances[i][j] = bs.length - j;
            } else if (j === b.length) {
                distances[i][j] = as.length - i;
            } else {
                distances[i][j] = Math.min(
                    1 + distances[i][j + 1],
                    1 + distances[i + 1][j],
                    (as[i] === bs[j] ? 0 : 1) + distances[i + 1][j + 1]
                );
            }
        }
    }

    return distances[0][0];
}
