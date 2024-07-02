interface FromCity {
    CityID: string;
    CityName: string;
}
interface ToCity {
    CityID: string;
    CityName: string;
}


export interface ITripSearchForm {
    FromCities: FromCity[],
    ToCities: ToCity[],
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

export type IPopularTrip = {
    tripID: string,
    fromCityID: string,
    fromCity: string,
    toCityID: string,
    toCity: string,
    priceFrom: number,
    imageUrl: string[],
}
