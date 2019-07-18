// export function maxSubarraySumBruteForce(a: number[]): number {
//     const n = a.length;
//     let max = 0;

//     for (let start = 0; start < n; start += 1) {
//         let sum = 0;
//         for (let i = 0; i < n; i += 1) {
//             sum += a[(start + i) % n];
//             max = Math.max(max, sum);
//         }
//     }

//     return max;
// }

// export function maxSubarraySumSmart(a: number[]): number {
// }
