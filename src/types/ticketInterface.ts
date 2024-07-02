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
    name: string
    stationID: string
  }


export type IServiceModel = {
  serviceID: string
  name: string
  price: number
  imageUrl: string
}

export type IService = {
  serviceTypeID: string
  stationID: string
  name: string
  serviceModels: IServiceModel[]
}
