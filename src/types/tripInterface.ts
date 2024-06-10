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

export interface ITripData {
    tripID: number,
    companyName: string,
    imageUrl: string,
    averageRating: number,
    quantityRating: number,
    startLocation: string,
    endLocation:  string,
    startTime: Date,
    endTime: Date,
    emptySeat: number,
    price: number,
}

export interface ITripSearchData {
    data: ITripData[],
    totalPages: number,
}

