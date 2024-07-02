export type ITicketData = {
  TripID: string
  RouteID: string
  CompanyName: string
  StartLocation: string
  EndLocation: string
  StartTime: string
  StartDate: string
  TotalSeats: number
  SeatBooked: string[]
  TicketType_TripModels: ITicketModels[]
}

export type ITicketModels = {
  TicketType_TripID: string
  TicketName: string
  Quantity: number
  Price: number
}

export type IStations = 
  {
    Name: string
    StationID: string
  }


export type IServiceModel = {
  ServiceID: string
  Name: string
  Price: number
  ImageUrl: string
}

export type IService = {
  ServiceTypeID: string
  StationID: string
  Name: string
  ServiceModels: IServiceModel[]
}
