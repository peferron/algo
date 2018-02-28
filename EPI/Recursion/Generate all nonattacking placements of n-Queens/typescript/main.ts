class PartialPlacement {
    constructor(public n: number) {}

    // List of indexes of occupied columns, from top to bottom.
    cols: number[] = [];

    // Set of indexes of occupied columns.
    colSet = new Set<number>();

    // Set of indexes of occupied top-right-to-bottom-left diagonals, starting with the diagonal
    // going through the top-left cell.
    botLeftDiagSet = new Set<number>();

    // Set of indexes of occupied top-left-to-bottom-right diagonals, starting with the diagonal
    // going through the top-right cell.
    botRightDiagSet = new Set<number>();

    addQueen(col: number): boolean {
        if (this.colSet.has(col)) {
            return false;
        }

        const row = this.cols.length;
        const botLeftDiag = this.getBotLeftDiag(row, col);
        if (this.botLeftDiagSet.has(botLeftDiag)) {
            return false;
        }

        const botRightDiag = this.getBotRightDiag(row, col);
        if (this.botRightDiagSet.has(botRightDiag)) {
            return false;
        }

        this.cols.push(col);
        this.colSet.add(col);
        this.botLeftDiagSet.add(botLeftDiag);
        this.botRightDiagSet.add(botRightDiag);
        return true;
    }

    removeQueen(): void {
        const col = this.cols.pop()!;
        const row = this.cols.length;
        this.colSet.delete(col);
        this.botLeftDiagSet.delete(this.getBotLeftDiag(row, col));
        this.botRightDiagSet.delete(this.getBotRightDiag(row, col));
    }

    isComplete(): boolean {
        return this.cols.length === this.n;
    }

    private getBotLeftDiag(row: number, col: number): number {
        return row + col;
    }

    private getBotRightDiag(row: number, col: number): number {
        return row + (this.n - col);
    }
}

export default function getNonAttackingPlacements(n: number): number[][] {
    if (n === 0) {
        return [[]];
    }

    const nonAttackingPlacements: number[][] = [];
    tryNextRow(new PartialPlacement(n), nonAttackingPlacements);
    return nonAttackingPlacements;
}

function tryNextRow(partialPlacement: PartialPlacement, nonAttackingPlacements: number[][]): void {
    for (let col = 0; col < partialPlacement.n; col += 1) {
        if (partialPlacement.addQueen(col)) {
            if (partialPlacement.isComplete()) {
                nonAttackingPlacements.push(partialPlacement.cols.slice());
            } else {
                tryNextRow(partialPlacement, nonAttackingPlacements);
            }
            partialPlacement.removeQueen();
        }
    }
}
