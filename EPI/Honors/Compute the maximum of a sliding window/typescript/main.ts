export interface Measurement {
    time: number;
    value: number;
}

export function slidingMaxBruteForce(measurements: Measurement[], duration: number): Measurement[] {
    return measurements.map(m => ({
        time: m.time,
        value: measurements.reduce(
            (max, m2) => m.time - duration <= m2.time && m2.time <= m.time && m2.value > max ? m2.value : max,
            0
        ),
    }));
}

export function slidingMaxSmart(measurements: Measurement[], duration: number): Measurement[] {
    // Tricky! Measurements with identical times need to be sorted by decreasing value to ensure that all measurements
    // can "see" the highest value.
    const sorted = measurements.sort((m1, m2) => m1.time === m2.time ? m2.value - m1.value : m1.time - m2.time);
    const queue: Measurement[] = [];
    const result: Measurement[] = [];

    for (const m of sorted) {
        // All measurements outside the sliding window are irrelevant and can be removed.
        while (queue.length && queue[0].time < m.time - duration) {
            // We use shift() for simplicity, but it can take linear time. Alternatives would be using a proper
            // double-ended queue, or simply incrementing a start index without shifting any elements (at the cost of
            // increased space).
            queue.shift();
        }

        // All measurements older than m and with value <= m.value are irrelevant and can be removed. Doing this at
        // every step has the nice effect of ensuring that queue values are decreasing, which means that the max is
        // simply the first value.
        while (queue.length && queue[queue.length - 1].value <= m.value) {
            queue.pop();
        }

        queue.push(m);

        result.push({
            time: m.time,
            value: queue[0].value,
        });
    }

    return result;
}
