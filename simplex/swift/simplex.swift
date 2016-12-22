// maximize returns a solution that maximizes the objective function of a linear program described
// by a canonical tableau. The first element of the solution is the output of the objective
// function, and the next elements are the values of each variable.
public func maximize(_ tableau: [[Float]]) -> [Float] {
    var tab = tableau

    // Pivot the tableau repeatedly until the solution is optimal.
    while let pivotColumnIndex = selectPivotColumn(tab) {
        let pivotRowIndex = selectPivotRow(tab, pivotColumnIndex: pivotColumnIndex)
        tab = pivot(tab, pivotRowIndex: pivotRowIndex, pivotColumnIndex: pivotColumnIndex)
    }

    return solution(tab)
}

// selectPivotColumn returns the index of the column that should be used for pivoting the tableau,
// or nil if the olution is already optimal.
func selectPivotColumn(_ tableau: [[Float]]) -> Int? {
    // Select the first column with a negative value in the first row.
    return tableau[0].dropLast().index { $0 < 0 }
}

// selectPivotRow returns the index of the row that should be used for pivoting the tableau at the
// given column.
func selectPivotRow(_ tableau: [[Float]], pivotColumnIndex: Int) -> Int {
    let positiveRowIndexes = (1..<tableau.count).filter { tableau[$0][pivotColumnIndex] > 0 }

    // Select the row with the lowest ratio.
    return positiveRowIndexes.min {
        let row0 = tableau[$0]
        let ratio0 = row0.last! / row0[pivotColumnIndex]

        let row1 = tableau[$1]
        let ratio1 = row1.last! / row1[pivotColumnIndex]

        return ratio0 < ratio1
    }!
}

// pivot returns a copy of the tableau, pivoted at the given cell.
func pivot(_ tableau: [[Float]], pivotRowIndex: Int, pivotColumnIndex: Int) -> [[Float]] {
    return tableau.enumerated().map { rowIndex, row in
        if rowIndex == pivotRowIndex {
            // Multiply the pivot row to set the pivot cell to 1.
            let coeff = row[pivotColumnIndex]
            return row.map { $0 / coeff }
        }

        // Multiply and add the pivot row to this row to set the cell to 0.
        let coeff = row[pivotColumnIndex] / tableau[pivotRowIndex][pivotColumnIndex]
        return row.enumerated().map { columnIndex, cellValue in
            cellValue - coeff * tableau[pivotRowIndex][columnIndex]
        }
    }
}

func solution(_ tableau: [[Float]]) -> [Float] {
    return (0..<tableau[0].count - 1).map { columnIndex in
        solution(tableau, columnIndex: columnIndex)
    }
}

func solution(_ tableau: [[Float]], columnIndex: Int) -> Float {
    let nonZeroRowIndexes = (0..<tableau.count).filter { tableau[$0][columnIndex] > 0 }

    if nonZeroRowIndexes.count != 1 {
        // The variable is nonbasic.
        return 0
    }

    // The variable is basic.
    let firstNonZeroRow = tableau[nonZeroRowIndexes[0]]
    return firstNonZeroRow.last! / firstNonZeroRow[columnIndex]
}
