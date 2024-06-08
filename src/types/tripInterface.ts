interface fromCity {
    cityID: number;
    cityName: string;
}
interface toCity {
    cityID: number;
    cityName: string;
}


export interface ITripSearchForm {
    fromCities: fromCity[],
    toCities: toCity[],
}

