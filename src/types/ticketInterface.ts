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