export default function isConstructible(letter: string, magazine: string): boolean {
    const remainingChars = countChars(letter);

    if (remainingChars.size === 0) {
        return true;
    }

    for (const char of magazine) {
        const count = remainingChars.get(char) || 0;

        if (count > 1) {
            remainingChars.set(char, count - 1);
        } else if (count === 1) {
            remainingChars.delete(char);
            if (remainingChars.size === 0) {
                return true;
            }
        }
    }

    return false;
}

function countChars(letter: string): Map<string, number> {
    const counts = new Map<string, number>();

    for (const char of letter) {
        if (/\s/.test(char)) {
            continue;
        }

        const count = counts.get(char) || 0;
        counts.set(char, count + 1);
    }

    return counts;
}
