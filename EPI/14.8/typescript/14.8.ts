export interface Student {
    age: number;
}

type Index = {start: number, next: number};

function getCounts(students: Student[]): Map<number, number> {
    const counts = new Map<number, number>();

    for (const {age} of students) {
        counts.set(age, (counts.get(age) || 0) + 1);
    }

    return counts;
}

function getIndexes(counts: Map<number, number>): Map<number, Index> {
    const indexes = new Map<number, Index>();
    let i = 0;

    for (const [age, count] of counts) {
        indexes.set(age, {start: i, next: i});
        i += count;
    }

    return indexes;
}

function swap(array: any[], i: number, j: number): void {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

export function rearrangeInPlace(students: Student[]): void {
    const counts = getCounts(students);

    // Optional sorting.
    const sortedCounts = new Map([...counts].sort(([age1], [age2]) => age1 - age2));

    const indexes = getIndexes(sortedCounts);
    let i = 0;

    while (i < students.length) {
        const {age} = students[i];
        const {start, next} = indexes.get(age)!;

        if (i >= start && i < next) {
            i += 1;
        } else {
            swap(students, i, next);
            indexes.set(age, {start, next: next + 1});
        }
    }
}
