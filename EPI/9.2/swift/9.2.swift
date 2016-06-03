// swiftlint:disable conditional_binding_cascade

enum Token {
    case Operator((Int, Int) -> Int)
    case Number(Int)

    init?(string: String) {
        switch string {
        case "+":
            self = .Operator(+)
        case "-":
            self = .Operator(-)
        case "*":
            self = .Operator(*)
        case "/":
            self = .Operator(/)
        default:
            if let num = Int(string) {
                self = .Number(num)
            } else {
                return nil
            }
        }
    }
}

public func evaluate(expression: String) -> Int? {
    let tokens = expression.characters.split(",").map { Token(string: String($0))! }
    var stack = [Token]()

    for token in tokens {
        switch token {
        case let .Operator(op):
            let rhsToken = stack.removeLast()
            let lhsToken = stack.removeLast()
            if case let .Number(lhs) = lhsToken, case let .Number(rhs) = rhsToken {
                stack.append(.Number(op(lhs, rhs)))
            } else {
                return nil
            }
        case .Number:
            stack.append(token)
        }
    }

    if case let .Number(num) = stack.first! {
        return num
    } else {
        return nil
    }
}
