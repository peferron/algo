export interface Composite {
    a: number;
    b: number;
}

export function smallestComposites(count: number): Composite[] {
    if (count < 1) {
        return [];
    }

    let incA = 0;
    let incB = 0;
    const result = [{a: 0, b: 0}];

    while (result.length < count) {
        const candidateA = {a: result[incA].a + 1, b: result[incA].b};
        const candidateB = {a: result[incB].a, b: result[incB].b + 1};

        // To avoid false equalities caused by floating-point rounding, compare a and b directly
        // rather than by their calc result.
        if (areEqual(candidateA, candidateB)) {
            result.push(candidateA);
            incA += 1;
            incB += 1;
        } else if (calc(candidateA) < calc(candidateB)) {
            result.push(candidateA);
            incA += 1;
        } else {
            result.push(candidateB);
            incB += 1;
        }
    }

    return result;
}

const areEqual = (x: Composite, y: Composite) => x.a === y.a && x.b === y.b;

const calc = (x: Composite) => x.a + x.b * Math.SQRT2;
