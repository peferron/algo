public typealias Student = (name: String, age: Int)

public func group(_ students: inout [Student]) {
    // Count the number of students in each age group.
    var ageCounts = [Int: Int]()
    for student in students {
        ageCounts[student.age] = (ageCounts[student.age] ?? 0) + 1
    }

    // Compute the indexes at which each age group should start.
    var ageStartIndexes = [Int: Int]()
    var nextFreeIndex = 0
    // The sorting step below increases the time complexity of the overall algorithm from O(n) to
    // O(n + m log m), where m is the number of age groups. To skip sorting, which is described as
    // optional in the book, simply remove `.sorted(by: ...)`.
    for (age, count) in ageCounts.sorted(by: { $0.key < $1.key }) {
        ageStartIndexes[age] = nextFreeIndex
        nextFreeIndex += count
    }

    // Last phase: iterate through the students array, making sure at each step that the current
    // index holds a student of the correct age group.
    // This phase is implemented very differently than in the book. I'm keeping it because I find it
    // more intuitive while still being O(n).
    var ageTargetIndexes = ageStartIndexes
    var index = 0
    while index < students.count {
        let age = students[index].age
        let ageStartIndex = ageStartIndexes[age]!
        let ageTargetIndex = ageTargetIndexes[age]!

        if index >= ageStartIndex && index < ageTargetIndex {
            // The current student is already well-positioned.
            index += 1
        } else {
            // Move the current student to the target index for this age group.
            if index != ageTargetIndex {
                students.swapAt(index, ageTargetIndex)
            }
            ageTargetIndexes[age]! += 1
        }
    }

    // The code below implements the last phase of the algorithm in the same way as in the book.
    // Note this implementation can put students of the same age in a different order than the
    // other implementation above, so tests might have to be slightly amended before they pass.
    /*
    while let ageStartIndex = ageStartIndexes.first?.value {
        // What is the age of the student currently occupying the ageStartIndex spot?
        let currentStudentAge = students[ageStartIndex].age

        // Where should this student be moved instead?
        let currentStudentTargetIndex = ageStartIndexes[currentStudentAge]!

        // Move it!
        if ageStartIndex != currentStudentTargetIndex {
            swap(&students[ageStartIndex], &students[currentStudentTargetIndex])
        }

        // Now that the student is placed in a correct spot, there is one less student to move in
        // its age group.
        ageCounts[currentStudentAge]! -= 1

        if ageCounts[currentStudentAge]! == 0 {
            // All students in this age group are correctly placed.
            ageStartIndexes[currentStudentAge] = nil
        } else {
            // The next student of the same age group should take the next spot.
            ageStartIndexes[currentStudentAge]! += 1
        }
    }
    */
}
