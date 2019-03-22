export default function multiply(a: number[], b: number[]): number[] {
    const product = [0];

    for (let ai = 0; ai < a.length; ai += 1) {
        const av = a[a.length - 1 - ai];
        for (let bi = 0; bi < b.length; bi += 1) {
            const bv = b[b.length - 1 - bi];
            const pi = ai + bi;
            const pv = Math.abs(av * bv);
            if (pv > 0) {
                product[pi] = (product[pi] || 0) + pv;
            }
            bubbleUp(product, pi);
        }
    }

    product.reverse();

    if (a[0] * b[0] < 0) {
        product[0] *= -1;
    }

    return product;
}

function bubbleUp(a: number[], i: number): void {
    if (a[i] >= 10) {
        a[i + 1] = (a[i + 1] || 0) + Math.floor(a[i] / 10);
        a[i] %= 10;
    }
}
