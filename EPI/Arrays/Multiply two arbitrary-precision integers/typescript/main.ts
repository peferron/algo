export default function multiply(a: number[], b: number[]): number[] {
    const isNegative = a[0] * b[0] < 0;
    const product: number[] = [];

    for (let ai = 0; ai < a.length; ai += 1) {
        const av = a[a.length - 1 - ai];
            for (let bi = 0; bi < b.length; bi += 1) {
            const bv = b[b.length - 1 - bi];
            const pi = ai + bi;
            product[pi] = (product[pi] || 0) + Math.abs(av * bv);
            bubbleUp(product, pi);
        }
    }

    while (product.length > 1 && product[product.length - 1] == 0) {
        product.pop();
    }

    if (isNegative) {
        product[product.length - 1] *= -1;
    }

    return product.reverse();
}

function bubbleUp(a: number[], i: number): void {
    if (a[i] >= 10) {
        a[i + 1] = (a[i + 1] || 0) + Math.floor(a[i] / 10);
        a[i] %= 10;
    }
}
