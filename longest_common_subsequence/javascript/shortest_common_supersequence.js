import {longestCommonSubsequence} from './longest_common_subsequence.js';

export function shortestCommonSupersequence(a, b) {
    const lcs = longestCommonSubsequence(a, b);

    let i = 0; // position in a
    let j = 0; // position in b
    let k = 0; // position in lcs
    let scs = '';

    while (true) {
        if (i === a.length) {
            scs += b.substring(j);
            break;
        }

        if (j === b.length) {
            scs += a.substring(i);
            break;
        }

        if (k === lcs.length) {
            scs += a.substring(i) + b.substring(j);
            break;
        }

        const ai = a.charAt(i);
        const bj = b.charAt(j);
        const lcsk = lcs.charAt(k);

        if (ai !== lcsk) {
            scs += ai;
            i += 1;
        } else if (bj !== lcsk) {
            scs += bj;
            j += 1;
        } else {
            scs += lcsk;
            i += 1;
            j += 1;
            k += 1;
        }
    }

    return scs;
}
