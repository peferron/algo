export interface Point {
    x: number;
    y: number;
}

export interface Rect {
    topLeft: Point;
    bottomRight: Point;
}

export function intersection(a: Rect, b: Rect): Rect | undefined {
    const top = Math.max(a.topLeft.y, b.topLeft.y);
    const bottom = Math.min(a.bottomRight.y, b.bottomRight.y);
    const left = Math.max(a.topLeft.x, b.topLeft.x);
    const right = Math.min(a.bottomRight.x, b.bottomRight.x);

    return top <= bottom && left <= right
        ? {topLeft: {x: left, y: top}, bottomRight: {x: right, y: bottom}}
        : undefined;
}
