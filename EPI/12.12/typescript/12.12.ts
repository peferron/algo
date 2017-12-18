export default function findDuplicateAndMissing(values: number[]): {duplicate: number, missing: number} {
    const expectedXor = values.reduce((acc, _, i) => acc ^ i, 0);
    const actualXor = values.reduce((acc, v) => acc ^ v, 0);
    const duplicateXorMissing = expectedXor ^ actualXor;

    // Find a bit that is set differently in duplicate and missing.
    // The trick below returns the lowest bit that is set to 1.
    const differingBit = duplicateXorMissing & ~(duplicateXorMissing - 1);

    const expectedFilteredXor = values.reduce((acc, _, i) => (i & differingBit) != 0 ? acc ^ i : acc, 0);
    const actualFilteredXor = values.reduce((acc, v) => (v & differingBit) != 0 ? acc ^ v : acc, 0);
    const eitherDuplicateOrMissing = expectedFilteredXor ^ actualFilteredXor;
    const other = eitherDuplicateOrMissing ^ duplicateXorMissing;

    return values.includes(eitherDuplicateOrMissing) ?
        {duplicate: eitherDuplicateOrMissing, missing: other} :
        {duplicate: other, missing: eitherDuplicateOrMissing};
}
