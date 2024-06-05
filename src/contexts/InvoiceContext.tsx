import { InvoiceData, Service, ticket } from '@/types/invoiceData'
import { createContext, useContext, useState } from 'react'

const defaultInvoiceData: InvoiceData = {
  startLocation: 'Bx.Miền Tây',
  endLocation: 'Bến Tre - Trà Vinh',
  timeStart: new Date('2023-05-23T07:00:00'),
  tickets: [
    {
      seatCode: 'A4',
      price: 150000,
      services: [
        {
          id: 11,
          name: 'Coca Cola',
          price: 20000,
          quantity: 1,
          type: 'drink',
          imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
          station: 'Bến Tre'
        },
        {
          id: 11,
          name: 'Coca Cola',
          price: 20000,
          quantity: 1,
          type: 'drink',
          imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
          station: 'Trà Vinh'
        }
      ]
    },
  ],
  totalPrice: 0
}

interface InvoiceContextType {
  invoiceData: InvoiceData
  updateTickets: (tickets: ticket[]) => void
  updateService: (seatCode: string, services: Service[]) => void
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

  const updateTickets = (tickets: ticket[]) => {
    console.log(tickets)
    const totalTicketPrice = tickets?.reduce((total, ticket) => total + ticket.price, 0)
    const totalServicePrice = tickets?.reduce(
      (total, ticket) =>
        total + ticket.services.reduce((serviceTotal, service) => serviceTotal + service.price * service.quantity, 0),
      0
    )
    const totalPrice = totalTicketPrice + totalServicePrice

    setInvoiceData((prevData) => ({
      ...prevData,
      tickets,
      totalPrice
    }))
  }
  const updateService = (seatCode: string, services: Service[]) => {
    const updatedTickets = invoiceData.tickets.map((ticket) =>
      ticket.seatCode === seatCode ? { ...ticket, services } : ticket
    )
    updateTickets(updatedTickets)
  }

  return <InvoiceContext.Provider value={{ invoiceData, updateTickets, updateService }}>{children}</InvoiceContext.Provider>
}
