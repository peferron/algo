export interface Item {
    weight: number;
    value: number;
}

export function getMaxValue(items: Item[], maxWeight: number): number {
    const cache = items.map(_ => new Map<number, number>());
    return rec(items, maxWeight, 0, cache);
}

function rec(items: Item[], maxWeight: number, minItemIndex: number, cache: Map<number, number>[]): number {
    if (minItemIndex >= items.length || maxWeight === 0) {
        return 0;
    }

    const map = cache[minItemIndex];

    if (map.has(maxWeight)) {
        return map.get(maxWeight)!;
    }

    const maxValueWithoutItem = rec(items, maxWeight, minItemIndex + 1, cache);

    const item = items[minItemIndex];
    const remainingMaxWeight = maxWeight - item.weight;
    const maxValueWithItem = remainingMaxWeight >= 0 ?
        item.value + rec(items, remainingMaxWeight, minItemIndex + 1, cache) :
         -1;

    const maxValue = Math.max(maxValueWithoutItem, maxValueWithItem);
    map.set(maxWeight, maxValue);
    return maxValue;
}
