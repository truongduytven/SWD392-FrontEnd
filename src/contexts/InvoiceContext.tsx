import { InvoiceData, Service, ticket } from '@/types/invoiceData'
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
  updateTicketServices: (seatCode: string, updatedServices: Service[]) => void
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
  // const addService = (seatCode: string, newService: Service) => {
  //   const updatedTickets = invoiceData.tickets.map((ticket) => {
  //     if (ticket.seatCode === seatCode) {
  //       const filterServices = ticket.services.filter((service) => service.id === newService.id)
  //       if (filterServices.length > 0) {
  //         const updatedServices = ticket.services.map((service) => {
  //           if (service.id === newService.id) {
  //             return { ...service, quantity: service.quantity + 1 }
  //           }
  //           return service
  //         })
  //         return { ...ticket, services: updatedServices }
  //       } else {
  //         return {
  //           ...ticket,
  //           services: [...ticket.services, newService]
  //         }
  //       }
  //     }
  //     return ticket
  //   })
  //   updateTickets(updatedTickets)
  // }
  // const updateService = (seatCode: string, serviceId: number, updatedService: Service) => {
  //   const updatedTickets = invoiceData.tickets.map((ticket) => {
  //     if (ticket.seatCode === seatCode) {
  //       const updatedServices = ticket.services.map((service) => {
  //         if (service.id === serviceId) {
  //           return { ...service, ...updatedService }
  //         }
  //         return service
  //       })
  //       return { ...ticket, services: updatedServices }
  //     }
  //     return ticket
  //   })
  //   setInvoiceData((prevData) => ({
  //     ...prevData,
  //     tickets: updatedTickets
  //   }))
  // }
  // const deleteService = (seatCode: string, serviceId: number) => {
  //   const updatedTickets = invoiceData.tickets.map((ticket) => {
  //     if (ticket.seatCode === seatCode) {
  //       return {
  //         ...ticket,
  //         services: ticket.services.filter((service) => service.id !== serviceId)
  //       }
  //     }
  //     return ticket
  //   })
  //   updateTickets(updatedTickets)
  // }

  const updateTicketServices = (seatCode: string, updatedServices: Service[]) => {
    const updatedTickets = invoiceData.tickets.map((ticket) => {
      if (ticket.seatCode === seatCode) {
        return { ...ticket, services: updatedServices }
      }
      return ticket
    })
    updateTickets(updatedTickets)
  }


  return (
    <InvoiceContext.Provider value={{ invoiceData, updateTickets, updateTicketServices }}>
      {children}
    </InvoiceContext.Provider>
  )
}
