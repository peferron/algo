import Darwin

let tests: [(cities: [City], indexOfAmpleCity: Int)] = [
    (
        cities: [
            (gas: 50, distanceToNextCity: 900),
            (gas: 20, distanceToNextCity: 600),
            (gas: 5, distanceToNextCity: 200),
            (gas: 30, distanceToNextCity: 400),
            (gas: 25, distanceToNextCity: 600),
            (gas: 10, distanceToNextCity: 200),
            (gas: 10, distanceToNextCity: 100),
        ],
        indexOfAmpleCity: 3
    )
]

for test in tests {
    let actual = indexOfAmpleCity(test.cities)
    guard actual == test.indexOfAmpleCity else {
        print("For cities \(test.cities), " +
            "expected index of ample city to be \(test.indexOfAmpleCity), but was \(actual)")
        exit(1)
    }
}
