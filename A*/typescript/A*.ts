import {HashSet, HashMap, MinHeap} from './data_structures';

export interface Point {
    x: number;
    y: number;
}

const free = ({x, y}: Point, pixels: boolean[][]) =>
    y >= 0 && y < pixels.length && x >= 0 && x < pixels[y].length && !pixels[y][x];

const allNeighbors = ({x, y}: Point) => [
    // Side neighbors.
    {x, y: y - 1}, {x: x - 1, y}, {x: x + 1, y}, {x, y: y + 1},
    // Diagonal neighbors.
    {x: x - 1, y: y - 1}, {x: x + 1, y: y - 1}, {x: x - 1, y: y + 1}, {x: x + 1, y: y + 1},
];

const freeNeighbors = (point: Point, pixels: boolean[][]) =>
    allNeighbors(point).filter(neighbor => free(neighbor, pixels));

const euclideanDistance = (start: Point, end: Point) =>
    Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));

const equal = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

const closest = (points: Point[], distances: HashMap<Point, number>) =>
    points.reduce((closest, point) => {
        const distance = distances.get(point);
        return !isNaN(distance) && distance < distances.get(closest) ? point : closest;
    });

function path(end: Point, parents: HashMap<Point, Point>): Point[] {
    // Recursive alternative:
    // return end ? [...path(parents.get(end), parents), end] : [];

    const path: Point[] = [];
    while (end) {
        path.push(end);
        end = parents.get(end);
    }
    return path.reverse();
}

export function shortestPath(pixels: boolean[][], start: Point, end: Point): Point[] {
    const processed = new HashSet<Point>();
    const pendingSet = new HashSet<Point>();
    const pendingHeap = new MinHeap<Point>((a, b) =>
        distancesFromStartToEndThroughPoint.get(a) - distancesFromStartToEndThroughPoint.get(b));
    const parents = new HashMap<Point, Point>();
    const distancesFromStartToPoint = new HashMap<Point, number>();
    const distancesFromStartToEndThroughPoint = new HashMap<Point, number>();

    // Set the initial situation.
    pendingSet.add(start);
    pendingHeap.add(start);
    distancesFromStartToPoint.set(start, 0);

    while (pendingSet.size) {
        const point = pendingHeap.deleteMin();
        pendingSet.delete(point);

        if (equal(point, end)) {
            return path(end, parents);
        }

        processed.add(point);

        for (const neighbor of freeNeighbors(point, pixels)) {
            if (processed.has(neighbor)) {
                continue;
            }

            if (!pendingSet.has(neighbor)) {
                pendingSet.add(neighbor);
                pendingHeap.add(neighbor);
            }

            const oldDistanceFromStartToNeighbor = distancesFromStartToPoint.get(neighbor);
            const newDistanceFromStartToNeighbor = distancesFromStartToPoint.get(point) +
                euclideanDistance(point, neighbor);

            if (isNaN(oldDistanceFromStartToNeighbor) ||
                newDistanceFromStartToNeighbor < oldDistanceFromStartToNeighbor) {
                parents.set(neighbor, point);
                distancesFromStartToPoint.set(neighbor, newDistanceFromStartToNeighbor);
                distancesFromStartToEndThroughPoint.set(neighbor,
                    newDistanceFromStartToNeighbor + euclideanDistance(neighbor, end));
            }
        }
    }

    return undefined;
}
