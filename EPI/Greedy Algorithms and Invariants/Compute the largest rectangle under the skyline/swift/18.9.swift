public func maxArea(buildingHeights heights: [Int]) -> Int {
    var pillars = [Int]()
    var maxArea = 0

    // Apend a zero-height building to make sure that all pillars end up blocked.
    for (index, height) in (heights + [0]).enumerated() {
        if let last = pillars.last, height == heights[last] {
            // The last pillar is made redundant by the current building.
            pillars.removeLast()
        }

        while let last = pillars.last, height < heights[last] {
            // The last pillar is blocked by the current building.
            pillars.removeLast()

            // Calculate the width of the rectangle supported by the last pillar.
            // - On the right, the last pillar is blocked by the current building.
            // - On the left, the last pillar is blocked by the preceding pillar. If there is no
            //   preceding pillar, then the rectangle extends all the way to the left.
            let right = index - 1
            let left = (pillars.last ?? -1) + 1
            let width = right - left + 1

            let area = width * heights[last]
            maxArea = max(maxArea, area)
        }

        pillars.append(index)
    }

    return maxArea
}
