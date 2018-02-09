public enum EndpointType {
    case Open
    case Closed
}

public typealias Endpoint = (value: Int, type: EndpointType)
public typealias Interval = (start: Endpoint, end: Endpoint)

public func union(_ intervals: [Interval]) -> [Interval] {
    // Sort intervals by earliest start.
    let sortedIntervals = intervals.sorted {
        $0.start.value < $1.start.value ||
        $0.start.value == $1.start.value && $0.start.type == .Closed
    }

    var result = [Interval]()

    // Repeatedly try to extend the last interval in the union with the next sorted interval.
    for interval in sortedIntervals {
        if let last = result.popLast() {
            result += union(first: last, second: interval)
        } else {
            result.append(interval)
        }
    }

    return result
}

// union returns the union of two intervals. The first interval must start earlier than or equal to
// the second interval.
func union(first a: Interval, second b: Interval) -> [Interval] {
    if a.end.value < b.start.value ||
        a.end.value == b.start.value && a.end.type == .Open && b.start.type == .Open {
        return [a, b]
    }

    return [(
        start: a.start,
        end: a.end.value > b.end.value ||
            a.end.value == b.end.value && a.end.type == .Closed ? a.end : b.end
    )]
}
