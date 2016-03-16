export function longestCommonSubsequence(a, b) {
    const t = table(a, b);
    return backtrack(t, a, b);
}

// table returns the longest common subsequence table of a and b, meaning that table[i][j] is the
// length of the longest common subsequence of the first i characters of a and the first j
// characters of b.
function table(a, b) {
    const rows = a.length + 1;
    const columns = b.length + 1;
    const table = Array.from({length: rows}, () => new Array(columns));

    // The longest common subsequence of the empty string and any other string can only be the empty
    // string itself, which has length 0. So we can already fill the first row and column with 0s.
    for (let i = 0; i < rows; i++) {
        table[i][0] = 0;
    }
    for (let j = 0; j < columns; j++) {
        table[0][j] = 0;
    }

    // Fill the rest of the table using dynamic programming.
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < columns; j++) {
            if (a.charAt(i - 1) === b.charAt(j - 1)) {
                table[i][j] = table[i - 1][j - 1] + 1;
            } else {
                table[i][j] = Math.max(table[i][j - 1], table[i - 1][j]);
            }
        }
    }

    return table;
}

// backtrack returns the longest common subsequence of a and b, given the already-built table.
// Different ways to backtrack might return different subsequences, but of course always of the same
// length (otherwise one wouldn't be a longest subsequence anymore!). The backtrack function below
// uses the same logic as the table-building function.
function backtrack(table, a, b, i = a.length, j = b.length) {
    if (i === 0 || j === 0) {
        return '';
    }
    if (a.charAt(i - 1) === b.charAt(j - 1)) {
        return backtrack(table, a, b, i - 1, j - 1) + a[i - 1];
    }
    if (table[i - 1][j] > table[i][j - 1]) {
        return backtrack(table, a, b, i - 1, j);
    } else {
        return backtrack(table, a, b, i, j - 1);
    }
}

// The backtracking function below works slightly differently and doesn't require b to be passed as
// parameter.
// function backtrack(table, a, i = table.length - 1, j = table[0].length - 1) {
//     if (i === 0 || j === 0) {
//         return '';
//     }
//     if (table[i - 1][j] === table[i][j]) {
//         return backtrack(table, a, i - 1, j);
//     }
//     if (table[i][j - 1] === table[i][j]) {
//         return backtrack(table, a, i, j - 1);
//     }
//     return backtrack(table, a, i - 1, j - 1) + a[i - 1];
// }
