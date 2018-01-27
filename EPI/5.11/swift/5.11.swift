// swiftlint:disable variable_name

// Rectangles are usually described with words such as 'top', 'bottom' and so on, but it can be
// confusing: math typically points the y-axis upwards, while computer graphics point it downwards.
// Therefore, we define rectangles as an origin point and a size; the origin point plus the size
// gives the diagonal point.

public typealias Point = (x: Int, y: Int)
public typealias Size = (w: Int, h: Int)

public struct Rect {
    let origin: Point
    let size: Size

    var diagonal: Point {
        return (x: origin.x + size.w, y: origin.y + size.h)
    }

    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }

    init(origin: Point, diagonal: Point) {
        self.origin = origin
        self.size = (w: diagonal.x - origin.x, h: diagonal.y - origin.y)
    }
}

public func intersection(_ a: Rect, _ b: Rect) -> Rect? {
    let intersection = Rect(
        origin: (
            x: max(a.origin.x, b.origin.x),
            y: max(a.origin.y, b.origin.y)
        ),
        diagonal: (
            x: min(a.diagonal.x, b.diagonal.x),
            y: min(a.diagonal.y, b.diagonal.y)
        )
    )

    return intersection.size.w >= 0 && intersection.size.h >= 0 ? intersection : nil
}
