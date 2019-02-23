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
    const lefts = buildings.map(building => ({x: building.left, building}));
    const rights = buildings.map(building => ({x: building.right, building}));
    const sides = lefts.concat(rights).sort((a, b) => a.x - b.x);
    const heap = new MaxHeap<Rectangle>((a, b) => a.height - b.height);
    const points: Point[] = [];

    // Iterate through the sorted sides, getting the max height at each position.
    for (const {x, building} of sides) {
        if (x === building.left) {
            heap.add(building);
        } else {
            // Pop buildings until finding one whose right side is still ahead.
            while (heap.max && heap.max.right <= x) {
                heap.deleteMax();
            }
        }

        const height = heap.max && heap.max.height || 0;

        if (!points.length || points[points.length - 1].height !== height) {
            points.push({x, height});
        }
    }

    return points;
}
