import Darwin

let tests: [(buildingHeights: [Int], maxArea: Int)] = [
    (
        buildingHeights: [],
        maxArea: 0
    ),
    (
        buildingHeights: [0],
        maxArea: 0
    ),
    (
        buildingHeights: [2],
        maxArea: 2
    ),
    (
        buildingHeights: [2, 2],
        maxArea: 4
    ),
    (
        buildingHeights: [2, 3],
        maxArea: 4
    ),
    (
        buildingHeights: [3, 3],
        maxArea: 6
    ),
    (
        buildingHeights: [2, 3, 2],
        maxArea: 6
    ),
    (
        buildingHeights: [1, 4, 2, 5, 6, 3, 2, 6, 6, 5, 2, 1, 3],
        maxArea: 20
    ),
]

for test in tests {
    let actual = maxArea(buildingHeights: test.buildingHeights)
    guard actual == test.maxArea else {
        print("For building heights \(test.buildingHeights), " +
            "expected max area to be \(test.maxArea), but was \(actual)")
        exit(1)
    }
}
