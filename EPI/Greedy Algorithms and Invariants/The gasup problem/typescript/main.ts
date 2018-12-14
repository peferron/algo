export interface City {
    gas: number;
    distanceToNext: number;
}

export function indexOfAmpleCity(cities: City[]): number {
    const mpg = getMpg(cities);
    let gas = 0;
    let minGas = 0;
    let minIndex = 0;

    for (const [index, city] of cities.entries()) {
        if (gas < minGas) {
            minGas = gas;
            minIndex = index;
        }

        gas += city.gas - city.distanceToNext / mpg;
    }

    return minIndex;
}

function getMpg(cities: City[]): number {
    const totalGas = cities.reduce((acc, city) => acc + city.gas, 0);
    const totalDistance = cities.reduce((acc, city) => acc + city.distanceToNext, 0);
    return totalDistance / totalGas;
}
