export interface  InvoiceData {
  routeID: string
  companyName: string
  userID: string | undefined
  tripID: string
  isBalance: boolean
  startLocation: string
  endLocation: string 
  startTime: string
  startDate: string
  endTime: string
  tickets: ticket[]
  totalPrice: number
}

export interface Service {
  serviceID: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  station: string
}

export interface ticket {
  ticketType_TripID: string
  seatCode: string
  price: number
  services: Service[]
}
