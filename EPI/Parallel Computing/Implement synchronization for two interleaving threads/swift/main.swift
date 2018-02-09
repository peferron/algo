import Dispatch

@available(OSX 10.10, *)
public func generateNumbersParallel(from start: Int, to end: Int) -> [Int] {
    var numbers = [Int]()
    let evenSemaphore = DispatchSemaphore(value: 1)
    let oddSemaphore = DispatchSemaphore(value: 0)

    DispatchQueue.global(qos: .default).async {
        for i in start..<end where i % 2 == 0 {
            evenSemaphore.wait()
            numbers.append(i)
            oddSemaphore.signal()
        }
    }

    for i in start..<end where i % 2 == 1 {
        oddSemaphore.wait()
        numbers.append(i)
        evenSemaphore.signal()
    }

    return numbers
}
