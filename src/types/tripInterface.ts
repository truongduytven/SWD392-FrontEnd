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
    tripID: string,
    templateID:string,
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
    items: ITripData[],
    totalCount: number,
}

