import {Point, Segment, intersection} from './intersection';
import MinHeap from './minheap';
import BinarySearchTree from './binary_search_tree';

// If two events happen at the same x-coordinate, the event with the lowest type value will be
// processed first.
enum EventType {
    Intersection = 0,
    LeftEndpoint = 1,
    RightEndpoint = 2,
}

interface Event {
    type: EventType;
    point: Point;
    segment?: Segment;
    segments?: {below: Segment, above: Segment};
}

class Events {
    private heap = new MinHeap<Event>((e1, e2) =>
        e1.point.x !== e2.point.x ? e1.point.x - e2.point.x : e1.type - e2.type
    );

    insertEndpoints(segment: Segment): void {
        // By convention, we order segment points from left to right.
        const ordered = segment[0].x < segment[1].x ? segment : segment.reverse() as Segment;

        this.heap.insert({
            type: EventType.LeftEndpoint,
            point: ordered[0],
            segment: ordered,
        });

        this.heap.insert({
            type: EventType.RightEndpoint,
            point: ordered[1],
            segment: ordered,
        });
    }

    insertIntersection(below: Segment, above: Segment, minX: number): void {
        const point = intersection(below, above);

        if (point && point.x >= minX) {
            this.heap.insert({
                type: EventType.Intersection,
                point,
                segments: {below, above},
            });
        }
    }

    removeIntersection(below: Segment, above: Segment): void {
        this.heap.removeElement(event =>
            event.type === EventType.Intersection &&
            event.segments!.below === below && event.segments!.above === above
        );
    }

    removeNext(): Event {
        return this.heap.removeMin();
    }
}

const y = (segment: Segment, x: number) => {
    const a = (segment[0].y - segment[1].y) / (segment[0].x - segment[1].x);
    const b = segment[0].y - a * segment[0].x;
    return a * x + b;
};

const compareY = (s1: Segment, s2: Segment, x: number) => {
    const vertical1 = s1[0].x === s1[1].x;
    const vertical2 = s2[0].x === s2[1].x;
    if (vertical1 && vertical2) {
        return 0;
    }
    if (vertical1) {
        return -1;
    }
    if (vertical2) {
        return 1;
    }
    return y(s1, x) - y(s2, x);
};

class SweepLine extends BinarySearchTree<Segment> {
    x: number | undefined;

    constructor() {
        super((a, b) => compareY(a, b, this.x!));
    }

    neighbors(segment: Segment): {below?: Segment, above?: Segment} {
        return {below: this.predecessor(segment), above: this.successor(segment)};
    }
}

export default function intersections(segments: Segment[]): Point[] {
    const events = new Events();
    for (const segment of segments) {
        events.insertEndpoints(segment);
    }

    const line = new SweepLine();
    const inters: Point[] = [];

    while (true) {
        const event = events.removeNext();
        if (!event) {
            return inters;
        }

        line.x = event.point.x;

        switch (event.type) {
            case EventType.LeftEndpoint: {
                // Step 1: insert the segment into the sweep line.
                line.insert(event.segment!);

                const {below, above} = line.neighbors(event.segment!);

                // Step 2: below and above are not neighbors anymore. Remove their intersection
                // event.
                if (below && above) {
                    events.removeIntersection(below, above);
                }

                // Step 3: add intersection events for the segment and its neighbors.
                if (below) {
                    events.insertIntersection(below, event.segment!, event.point.x);
                }
                if (above) {
                    events.insertIntersection(event.segment!, above, event.point.x);
                }

                break;
            }

            case EventType.RightEndpoint: {
                const {below, above} = line.neighbors(event.segment!);

                // Step 1: the neighbors of the segment are now neighbors of each other. Add their
                // intersection event.
                if (below && above) {
                    events.insertIntersection(below, above, event.point.x);
                }

                // Step 2: remove the segment from the sweep line.
                line.remove(event.segment!);

                break;
            }

            case EventType.Intersection: {
                // Step 1: add the intersection point to the list.
                inters.push(event.point);

                const {below} = line.neighbors(event.segments!.below);
                const {above} = line.neighbors(event.segments!.above);

                // Step 2: swap the positions of the intersecting segments in the sweep line.
                line.swap(event.segments!.below, event.segments!.above);

                // Step 3: before the swap, the line order from bottom to top was
                // [below, event.segments!.below, event.segments!.above, above]. But after the swap
                // it changed to [below, event.segments!.above, event.segments!.below, above].
                // Ex-neighbors need to have their intersection event removed, and new neighbors
                // need to have their intersection event inserted.
                if (below) {
                    events.removeIntersection(below, event.segments!.below);
                    events.insertIntersection(below, event.segments!.above, event.point.x);
                }
                if (above) {
                    events.removeIntersection(event.segments!.above, above);
                    events.insertIntersection(event.segments!.below, above, event.point.x);
                }

                break;
            }
        }
    }
}
