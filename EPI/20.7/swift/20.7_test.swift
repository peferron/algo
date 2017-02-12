if #available(OSX 10.10, *) {
    var expected = 1

    for _ in 0...50000 {
        if arc4random_uniform(2) == 0 {
            write()
            expected += 1
        } else {
            read()
        }
    }

    concurrentQueue.sync(execute: DispatchWorkItem(qos: .default, flags: .barrier) {
        guard data == expected else {
            print("Expected data to be \(expected), but was \(data)")
            exit(1)
        }
    })
} else {
    print("Requires OS X 10.10 or newer")
    exit(1)
}
