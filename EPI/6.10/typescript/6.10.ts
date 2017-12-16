export default function permute(array: any[], permutation: number[]): void {
    for (let i = 0; i < array.length; i += 1) {
        const originalPermutationI = permutation[i];

        while (permutation[i] >= 0) {
            const j = permutation[i];

            // Move array[i] to its correct position, j,
            swap(array, i, j);

            // Following this swap, the new correct position for array[i] is now permutation[j].
            permutation[i] = permutation[j];

            // Trick: mark array[j] as being in the right position by making permutation[j]
            // negative in a reversible way (since we want permutation to be unchanged when this
            // function returns).
            permutation[j] -= array.length;
        }

        // Restore permutation[i] to its original value.
        permutation[i] = originalPermutationI;
    }
}

function swap(array: any[], i: number, j: number): void {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}
