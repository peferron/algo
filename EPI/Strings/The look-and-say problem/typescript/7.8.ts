export default function lookAndSay(n: number): string {
    let result = '1';

    for (let i = 0; i < n; i += 1) {
        result = next(result);
    }

    return result;
}

function next(s: string): string {
    let result = '';
    let currentChar = '';
    let currentCharCount = 0;

    for (const char of s) {
        if (char === currentChar) {
            currentCharCount += 1;
        } else {
            result += say(currentChar, currentCharCount);
            currentChar = char;
            currentCharCount = 1;
        }
    }

    return result + say(currentChar, currentCharCount);
}

function say(char: string, count: number): string {
    return count > 0 ? count + char : '';
}
