interface fromCity {
    cityID: string;
    cityName: string;
}
interface toCity {
    cityID: string;
    cityName: string;
}


export interface ITripSearchForm {
    fromCities: fromCity[],
    toCities: toCity[],
}

export interface ITripData {
    tripID: number,
    companyName: string,
    imageUrl: string,
    averageRating: number,
    quantityRating: number,
    startLocation: string,
    endLocation:  string,
    startTime: string,
    endTime: string,
    emptySeat: number,
    price: number,
}

export interface ITripSearchData {
    data: ITripData[],
    totalPages: number,
}

