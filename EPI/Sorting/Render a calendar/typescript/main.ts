export interface Event {
    start: number;
    end: number;
}

interface Boundary {
    type: 'start' | 'end';
    time: number;
}

export function maxConcurrentEvents(events: Event[]): number {
    const boundaries = flatten(events.map(getBoundaries));
    boundaries.sort(compareBoundaries);

    let concurrent = 0;
    let max = 0;

    for (const b of boundaries) {
        concurrent += (b.type === 'start' ? 1 : -1);
        max = Math.max(max, concurrent);
    }

    return max;
}

const getBoundaries = (event: Event) => [
    {type: 'start', time: event.start},
    {type: 'end', time: event.end},
];

// If event A ends at the same time as event B starts, we consider these two events to not overlap.
// This means end boundaries must be placed before start boundaries with identical times.
const compareBoundaries = (a: Boundary, b: Boundary) =>
    a.time < b.time || a.time === b.time && a.type === 'end' ? -1 : 1;

const flatten = <T>(a: T[][]) => Array.prototype.concat(...a);
