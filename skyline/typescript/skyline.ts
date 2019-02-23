import MaxHeap from './max_heap';

export interface Rectangle {
    left: number;
    right: number;
    height: number;
}

export interface Point {
    x: number;
    height: number;
}

export function skyline(buildings: Rectangle[]): Point[] {
    const lefts = buildings.map(b => ({type: 'left', x: b.left, height: b.height}));
    const rights = buildings.map(b => ({type: 'right', x: b.right, height: b.height}));
    const endpoints = lefts.concat(rights).sort((a, b) => a.x - b.x);
    const heap = new MaxHeap();
    const points: Point[] = [];

    // Iterate through the sorted endpoints, adding and removing buildings and getting the max height at each position.
    for (const e of endpoints) {
        if (e.type === 'left') {
            heap.add(e.height);
        } else {
            heap.delete(e.height);
        }

        const height = heap.max() || 0;

        if (!points.length || points[points.length - 1].height !== height) {
            points.push({x: e.x, height});
        }
    }

    return points;
}
