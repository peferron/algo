// Implementations of this algorithm often insert an arbitrary character (e.g. a space) at the
// beginning of each string. It makes working with table and string indexes easier. But it's also
// almost incomprehensible to someone who doesn't already understand the algorithm. "Trust me, just
// put a space here, you'll see." For this reason, I chose not to insert spaces in this
// implementation, and deal with indexes explicitly instead.

export function distance(a: string, b: string): number {
    // table[i][j] is the edit distance between the first i characters of a, and the first j
    // characters of b. This means the table should have |a|+1 rows and |b|+1 columns.
    const rows = a.length + 1;
    const columns = b.length + 1;
    const table = Array.from({length: rows}, () => new Array(columns));

    // The edit distance between the empty string and a string of length k is k. So we can already
    // fill the first column and the first row of the table.
    for (let i = 0; i < rows; i++) {
        table[i][0] = i;
    }
    for (let j = 0; j < columns; j++) {
        table[0][j] = j;
    }

    // Fill the rest of the table using dynamic programming.
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < columns; j++) {
            // Let's calculate table[i][j].

            // WWe know that table[i-1][j-1] is already calculated and is the edit distance between
            // a[0...i-2] and b[0...j-2]. If a[i-1] and b[j-1] are identical then we can do a match,
            // which keeps the same edit distance as table[i-1][j-1]. If they are different then we
            // can do a substitution, which increases the edit distance by 1.
            const matchOrSubstitution = table[i - 1][j - 1] +
                (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1);

            // We can also delete b[j].
            const deletion = table[i][j - 1] + 1;

            // We can also insert a[i] after b[j]. (Depending on the point of view, we can also see
            // that as deleting a[i].)
            const insertion = table[i-1][j] + 1;

            // The final edit distance is the best of all these possible operations.
            table[i][j] = Math.min(matchOrSubstitution, deletion, insertion);
        }
    }

    // Return the edit distance between the entirety of a and the entirety of b.
    return table[a.length][b.length];
}
