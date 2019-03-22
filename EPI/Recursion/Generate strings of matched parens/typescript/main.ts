export default function generateMatchedParens(pairs: number): string[] {
    const cache = Array.from({length: pairs + 1}, () => new Array(pairs + 1));
    return rec(pairs, 0, cache);
}

function rec(left: number, right: number, cache: string[][][]): string[] {
    if (cache[left][right]) {
        return cache[left][right];
    }

    const result: string[] = [];

    if (left === 0 && right === 0) {
        result.push('');
    } else {
        if (left > 0) {
            const subResult = rec(left - 1, right + 1, cache).map(s => '(' + s);
            result.push(...subResult);
        }
        if (right > 0) {
            const subResult = rec(left, right - 1, cache).map(s => ')' + s);
            result.push(...subResult);
        }
    }

    cache[left][right] = result;
    return result;
}
