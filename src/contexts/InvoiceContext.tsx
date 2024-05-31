import { createContext, useContext, useState } from 'react'

interface InvoiceData {
  startLocation: string
  endLocation: string
  timeStart: Date
  tickets: {
    seatCode: string
    price: number
  }[]
  service: {
    name: string
    price: number
    quantity: number
  }[]
  totalPrice: number
}

interface Seat {
  seatCode: string
  price: number
}

const defaultInvoiceData: InvoiceData = {
  startLocation: 'Bx.Miền Tây',
  endLocation: 'Bến Tre - Trà Vinh',
  timeStart: new Date('2023-05-23T07:00:00'),
  tickets: [
    { seatCode: 'B01', price: 400000 },
    { seatCode: 'B02', price: 400000 },
    { seatCode: 'B03', price: 400000 }
  ],
  service: [
    { name: 'Service A', price: 50000, quantity: 1 },
    { name: 'Service B', price: 100000, quantity: 2 }
  ],
  totalPrice: 1300000
}

interface InvoiceContextType {
  invoiceData: InvoiceData
  updateTickets: (tickets: Seat[]) => void
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)

// Create a hook to use the InvoiceContext
export const useInvoice = () => {
  const context = useContext(InvoiceContext)
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider')
  }
  return context
}

// Create a provider component
export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData)

  const updateTickets = (tickets: Seat[]) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      tickets,
      totalPrice: tickets.reduce((total, seat) => total + seat.price, 0) +
        prevData.service.reduce((total, service) => total + service.price * service.quantity, 0),
    }));
  };

  return <InvoiceContext.Provider value={{ invoiceData, updateTickets }}>{children}</InvoiceContext.Provider>
}
