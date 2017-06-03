export default function merge<T>(dst: T[], dstLen: number, src: T[]): void {
    let dstIdx = dstLen - 1;
    let srcIdx = src.length - 1;

    while (srcIdx >= 0) {
        const targetIdx = dstIdx + srcIdx + 1;

        if (dstIdx >= 0 && dst[dstIdx] > src[srcIdx]) {
            dst[targetIdx] = dst[dstIdx];
            dstIdx -= 1;
        } else {
            dst[targetIdx] = src[srcIdx];
            srcIdx -= 1;
        }
    }
}
