export interface Endpoint {
    value: number;
    isClosed: boolean;
}

export interface Interval {
    start: Endpoint;
    end: Endpoint;
}

export function union(intervals: Interval[]): Interval[] {
    const sorted = intervals.sort(compareIntervalStart);
    const result: Interval[] = [];

    for (const interval of sorted) {
        const last = result[result.length - 1];

        if (last && hasOverlap(last, interval)) {
            result[result.length - 1] = merge(last, interval);
        } else {
            result.push(interval);
        }
    }

    return result;
}

const compareIntervalStart = (a: Interval, b: Interval) =>
    a.start.value !== b.start.value ?
        a.start.value - b.start.value :
        (a.start.isClosed ? 0 : 1) - (b.start.isClosed ? 0 : 1);

const compareIntervalEnd = (a: Interval, b: Interval) =>
    a.end.value !== b.end.value ?
        a.end.value - b.end.value :
        (a.end.isClosed ? 1 : 0) - (b.end.isClosed ? 1 : 0);

const hasOverlap = (left: Interval, right: Interval) =>
    left.end.value > right.start.value ||
    left.end.value === right.start.value && (left.end.isClosed || right.start.isClosed);

const merge = (left: Interval, right: Interval) => ({
    start: left.start,
    end: compareIntervalEnd(left, right) < 0 ? right.end : left.end
});
