import Dispatch

let concurrentQueue = DispatchQueue(label: "EPI", attributes: .concurrent)
var data = 1

@available(OSX 10.10, *)
public func write() {
    concurrentQueue.async(execute: DispatchWorkItem(qos: .default, flags: .barrier) {
        data += 1
    })
}

@available(OSX 10.10, *)
public func read() {
    concurrentQueue.async {
        // print(data)
    }
}
