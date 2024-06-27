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
    TripID: string,
    RouteID: string,
    TemplateID:string,
    CompanyName: string,
    ImageUrl: string,
    AverageRating: number,
    QuantityRating: number,
    StartLocation: string,
    EndLocation:  string,
    StartDate: string,
    EndDate: string,
    StartTime: string,
    EndTime: string,
    EmptySeat: number,
    Price: number,
}

export interface ITripSearchData {
    Items: ITripData[],
    TotalCount: number,
}

