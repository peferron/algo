export enum Peg {
    P1,
    P2,
    P3,
}

export interface Move {
    from: Peg;
    to: Peg;
}

export function hanoi(n: number, from: Peg, to: Peg, tmp: Peg): Move[] {
    if (n < 1) {
        return [];
    }

    return [
        ...hanoi(n - 1, from, tmp, to),
        {from, to},
        ...hanoi(n - 1, tmp, to, from)
    ];
}
