export interface  InvoiceData {
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
  id: number
  name: string
  price: number
  quantity: number
  type: string
  imageUrl: string
  station: string
}

export interface ticket {
  ticketType_TripID: string
  seatCode: string
  price: number
  services: Service[]
}
