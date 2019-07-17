public typealias City = (gas: Int, distanceToNextCity: Int)

public func indexOfAmpleCity(_ cities: [City]) -> Int {
    // The problem assumes that the total amount of gas is exactly the amount required to go around
    // the road once. This means we can derive the vehicle MPG from the road information.
    let totalGas = cities.reduce(0) { $0 + $1.gas }
    let totalDistance = cities.reduce(0) { $0 + $1.distanceToNextCity }
    let mpg = totalDistance / totalGas

    // gas[i] is the amount of gas remaining in the tank upon reaching cities[i] in the road
    // starting at cities[0]. This amount of gas can be negative.
    var gas = [0]

    for i in 1..<cities.count {
        let remainingGas = gas[i - 1]
        let refilledGas = cities[i - 1].gas
        let spentGas = cities[i - 1].distanceToNextCity / mpg

        gas.append(remainingGas + refilledGas - spentGas)
    }

    // Let's say gas[k] is the minimum value. If we start the road at cities[k], then gas[k] becomes
    // 0, and all other gas values become >= 0. This means that cities[k] is an ample city.
    return gas.firstIndex(of: gas.min()!)!
}
