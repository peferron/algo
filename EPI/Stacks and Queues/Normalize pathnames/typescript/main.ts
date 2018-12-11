export default function normalize(path: string): string {
    const original = path.split('/');
    const normalized: string[] = [];

    for (const [i, component] of original.entries()) {
        switch (component) {
            case '':
                if (i === 0 || i === original.length - 1) {
                    normalized.push(component);
                }
                break;

            case '.':
                break;

            case '..':
                if (normalized.length === 0 || normalized[normalized.length - 1] === '..') {
                    normalized.push(component);
                } else if (normalized.pop() === '') {
                    throw new Error('Invalid path');
                }
                break;

            default:
                normalized.push(component);
                break;
        }
    }

    if (normalized.length === 0) {
        return '.';
    }

    return normalized.join('/');
}
