export function isPalindromeSimple(s: string): boolean {
    const stripped = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return stripped === [...stripped].reverse().join('');
}

export function isPalindromeSmart(s: string): boolean {
    const chars = [...s];
    let left = 0;
    let right = chars.length - 1;

    while (left < right) {
        if (!isAlphanumeric(chars[left])) {
            left += 1;
            continue;
        }

        if (!isAlphanumeric(chars[right])) {
            right -= 1;
            continue;
        }

        if (!areEqual(chars[left], chars[right])) {
            return false;
        }

        left += 1;
        right -= 1;
    }

    return true;
}

const isAlphanumeric = (char: string) => /[a-zA-Z0-9]/.test(char);

const areEqual = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
