export default function reverseWords(s: string): string {
    // JS strings are immutable, so we use an intermediate array representation.
    const chars = [...s];

    reverseWordChars(chars);
    reverseChars(chars, 0, chars.length - 1);

    return chars.join('');
}

function reverseWordChars(chars: string[]): void {
    let wordStart = 0;

    for (let i = 0; i <= chars.length; i += 1) {
        if (i === chars.length || chars[i] === ' ') {
            const wordEnd = i - 1;
            reverseChars(chars, wordStart, wordEnd);
            wordStart = i + 1;
        }
    }
}

function reverseChars(chars: string[], start: number, end: number): void {
    while (start < end) {
        const tmp = chars[start];
        chars[start] = chars[end];
        chars[end] = tmp;
        start += 1;
        end -= 1;
    }
}
