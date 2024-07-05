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
    CompanyID:string,
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
    TripId: string,
    FromCityId: string,
    FromCity: string,
    ToCityId: string,
    ToCity: string,
    PriceFrom: number,
    ImageUrl: string[],
}
