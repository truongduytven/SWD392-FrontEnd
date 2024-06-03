import { InvoiceData, ticket } from '@/types/invoiceData'
import { createContext, useContext, useState } from 'react'

const defaultInvoiceData: InvoiceData = {
  startLocation: 'Bx.Miền Tây',
  endLocation: 'Bến Tre - Trà Vinh',
  timeStart: new Date('2023-05-23T07:00:00'),
  tickets: [],
  totalPrice: 0
}

interface InvoiceContextType {
  invoiceData: InvoiceData
  updateTickets: (tickets: ticket[]) => void
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

  return <InvoiceContext.Provider value={{ invoiceData, updateTickets , }}>{children}</InvoiceContext.Provider>
}
