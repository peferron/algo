export interface Point {
    x: number;
    y: number;
}

export type Segment = [Point, Point];

export function intersection(s1: Segment, s2: Segment): Point {
    // Express segments as y = ax + b.

    const a1 = (s1[1].y - s1[0].y) / (s1[1].x - s1[0].x);
    const a2 = (s2[1].y - s2[0].y) / (s2[1].x - s2[0].x);

    if (a1 === a2 || !isFinite(a1) && !isFinite(a2)) {
        // The segments are parallel.
        return undefined;
    }

    let intX: number;
    let intY: number;

    if (!isFinite(a1)) {
        // s1 is vertical.
        intX = s1[0].x;
        const b2 = s2[0].y - a2 * s2[0].x;
        intY = a2 * intX + b2;
    } else if (!isFinite(a2)) {
        // s2 is vertical.
        intX = s2[0].x;
        const b1 = s1[0].y - a1 * s1[0].x;
        intY = a1 * intX + b1;
    } else {
        // None of the segments are vertical.
        const b1 = s1[0].y - a1 * s1[0].x;
        const b2 = s2[0].y - a2 * s2[0].x;
        intX = (b2 - b1) / (a1 - a2);
        intY = a1 * intX + b1;
    }

    if (intX >= Math.min(s1[0].x, s1[1].x) && intX <= Math.max(s1[0].x, s1[1].x) &&
        intY >= Math.min(s1[0].y, s1[1].y) && intY <= Math.max(s1[0].y, s1[1].y) &&
        intX >= Math.min(s2[0].x, s2[1].x) && intX <= Math.max(s2[0].x, s2[1].x) &&
        intY >= Math.min(s2[0].y, s2[1].y) && intY <= Math.max(s2[0].y, s2[1].y)) {
        return {x: intX, y: intY};
    }

    return undefined;
}
