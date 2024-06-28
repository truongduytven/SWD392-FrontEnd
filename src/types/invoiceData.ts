export interface  InvoiceData {
  companyName: string
  userID: string | undefined
  tripID: string
  isBalance: boolean
  startLocation: string
  endLocation: string 
  timeStart: Date 
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
  seatCode: string
  price: number
  services: Service[]
}
