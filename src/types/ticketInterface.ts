export type ITicketData = {
  tripID: string
  routeID: string
  companyName: string
  startLocation: string
  endLocation: string
  startTime: string
  startDate: string
  totalSeats: number
  seatBooked: string[]
  ticketType_TripModels: ITicketModels[]
}

export type ITicketModels = {
  ticketType_TripID: string
  ticketName: string
  quantity: number
  price: number
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
