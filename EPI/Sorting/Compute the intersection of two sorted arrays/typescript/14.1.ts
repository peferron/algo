export function intersectionSimple<T>(a: T[], b: T[]): T[] {
    const aSet = new Set(a);
    const bSet = new Set(b);
    return [...aSet].filter(v => bSet.has(v));
}

export function intersectionSmart<T>(a: T[], b: T[]): T[] {
    const result: T[] = [];
    let ai = 0;
    let bi = 0;

    while (ai < a.length && bi < b.length) {
        const av = a[ai];
        const bv = b[bi];

        if (av < bv) {
            ai += 1;
        } else if (av > bv) {
            bi += 1;
        } else {
            if (result.length === 0 || result[result.length - 1] !== av) {
                result.push(av);
            }
            ai += 1;
            bi += 1;
        }
    }

    return result;
}
