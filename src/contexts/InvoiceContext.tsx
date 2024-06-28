import { InvoiceData, Service, ticket } from '@/types/invoiceData';
import { createContext, useContext, useState } from 'react';

const defaultInvoiceData: InvoiceData = {
  userID: '',
  tripID: '',
  companyName: '',
  isBalance: false,
  startLocation: 'Bx.Miền Tây',
  endLocation: 'Bến Tre - Trà Vinh',
  timeStart: new Date('2023-05-23T07:00:00'),
  tickets: [],
  totalPrice: 0,
};

interface InvoiceContextType {
  invoiceData: InvoiceData;
  updateTickets: (tickets: ticket[]) => void;
  updateTicketServices: (seatCode: string, updatedServices: Service[]) => void;
  updateUserIDTripID: (userID: string | undefined, tripID: string , companyName: string) => void;
  updateInvoiceData: (startLocation: string, endLocation: string, timeStart: Date) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

// Create a hook to use the InvoiceContext
export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};

// Create a provider component
export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);

  const updateTickets = (tickets: ticket[]) => {
    const totalTicketPrice = tickets.reduce((total, ticket) => total + ticket.price, 0);
    const totalServicePrice = tickets.reduce(
      (total, ticket) =>
        total +
        ticket.services.reduce((serviceTotal, service) => serviceTotal + service.price * service.quantity, 0),
      0
    );
    const totalPrice = totalTicketPrice + totalServicePrice;

    setInvoiceData((prevData) => ({
      ...prevData,
      tickets,
      totalPrice,
    }));
  };

  const updateTicketServices = (seatCode: string, updatedServices: Service[]) => {
    const updatedTickets = invoiceData.tickets.map((ticket) => {
      if (ticket.seatCode === seatCode) {
        return { ...ticket, services: updatedServices };
      }
      return ticket;
    });

    // Directly update the state with new ticket information
    setInvoiceData((prevData) => ({
      ...prevData,
      tickets: updatedTickets,
    }));
  };

  const updateUserIDTripID = (userID: string | undefined, tripID: string , companyName: string) => {
    if(userID === undefined) {
      userID = '';
    }
    setInvoiceData((prevData) => ({
      ...prevData,
      userID: userID,
      tripID: tripID,
      companyName: companyName,
    }));
  }

  const updateInvoiceData = (startLocation: string, endLocation: string, timeStart: Date) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      startLocation: startLocation ?? prevData.startLocation,
      endLocation: endLocation ?? prevData.endLocation,
      timeStart: timeStart ?? prevData.timeStart,
    }));
  };  

  return (
    <InvoiceContext.Provider value={{ invoiceData, updateTickets, updateTicketServices, updateInvoiceData, updateUserIDTripID }}>
      {children}
    </InvoiceContext.Provider>
  );
};
