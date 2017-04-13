import MaxHeap from './max_heap';

export interface Rectangle {
    left: number;
    right: number;
    height: number;
}

export interface Point {
    x: number;
    y: number;
}

export function skyline(buildings: Rectangle[]): Point[] {
    // Build a map from each position to the list of buildings that start or end there.
    const positionToBuildings = new Map<number, Rectangle[]>();
    for (const building of buildings) {
        for (const x of [building.left, building.right]) {
            if (positionToBuildings.has(x)) {
                positionToBuildings.get(x)!.push(building);
            } else {
                positionToBuildings.set(x, [building]);
            }
        }
    }

    // Build a sorted list of all left and right positions.
    const xs = buildings.map(b => b.left)
        .concat(buildings.map(b => b.right))
        .sort((x1, x2) => x1 - x2);

    // Iterate through the sorted list of positions, adding and removing buildings as we go, and
    // getting the max height at each position.
    const heap = new MaxHeap();
    heap.add(0);
    const points = xs.map(x => {
        for (const building of positionToBuildings.get(x)!) {
            if (x === building.left) {
                heap.add(building.height);
            } else {
                heap.delete(building.height);
            }
        }
        return {x, y: heap.max()};
    });

    // Remove redundant points.
    return points.filter((point, i) => i === 0 || point.y !== points[i - 1].y);
}
