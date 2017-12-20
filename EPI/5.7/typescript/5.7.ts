export function powRecursive(base: number, exponent: number): number {
    if (exponent === 0) {
        return 1;
    }

    if (exponent < 0) {
        return 1 / powRecursive(base, -exponent);
    }

    if (exponent % 2 === 0) {
        return powRecursive(base * base, exponent / 2);
    }

    return powRecursive(base * base, (exponent - 1) / 2) * base;
}

export function powIterative(base: number, exponent: number): number {
    if (exponent < 0) {
        base = 1 / base;
        exponent = -exponent;
    }

    var result = 1;

    while (exponent > 0) {
        if ((exponent & 1) === 1) {
            result *= base;
        }
        base *= base;
        exponent >>= 1;
    }

    return result;
}
