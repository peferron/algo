public typealias Event = (start: Int, end: Int)

typealias Boundary = (time: Int, type: BoundaryType)

enum BoundaryType {
    case Start
    case End
}

public func maxConcurrentEvents(_ events: [Event]) -> Int {
    let boundaries = events
        .flatMap { event -> [Boundary] in [
            (time: event.start, type: .Start),
            (time: event.end, type: .End)
        ]}
        .sorted {
            // If multiple boundaries share the same time, process Ends before Starts. That's
            // because if one event ends at the same time another event starts, we do not consider
            // these events to be overlapping.
            $0.time < $1.time || $0.time == $1.time && $0.type == .End
        }

    var currentOverlap = 0
    var maxOverlap = 0

    for boundary in boundaries {
        currentOverlap += boundary.type == .Start ? 1 : -1
        maxOverlap = max(currentOverlap, maxOverlap)
    }

    return maxOverlap
}
