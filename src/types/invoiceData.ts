export interface InvoiceData {
  startLocation: string
  endLocation: string
  timeStart: Date
  tickets: ticket[]
  totalPrice: number
}

export interface Service {
  name: string
  price: number
  quantity: number
}

export interface ticket {
  seatCode: string
  price: number
  services: Service[]
}
