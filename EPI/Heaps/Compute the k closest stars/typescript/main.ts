import {MaxHeap} from './heap';

const EARTH: Coordinates = {x: 0, y: 0, z: 0};

export interface Coordinates {
    x: number;
    y: number;
    z: number;
}

export function getClosestStars(stars: Coordinates[], k: number): Coordinates[] {
    const heap = new MaxHeap<Coordinates>((a, b) => distanceSquared(a, EARTH) - distanceSquared(b, EARTH));

    for (const star of stars) {
        heap.insert(star);

        if (heap.length > k) {
            heap.removeMax();
        }
    }

    return heap.values();
}

function distanceSquared(a: Coordinates, b: Coordinates): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;

    return dx * dx + dy * dy + dz * dz;
}
