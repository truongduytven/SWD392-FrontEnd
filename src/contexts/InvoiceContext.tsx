import { InvoiceData, Service, ticket } from '@/types/invoiceData';
import { createContext, useContext, useState } from 'react';

const defaultInvoiceData: InvoiceData = {
  companyID: '',
  routeID: '',
  userID: '',
  tripID: '',
  companyName: '',
  isBalance: false,
  startLocation: '',
  endLocation: '',
  startTime: '',
  endTime: '',
  startDate: '',
  tickets: [],
  totalPrice: 0,
};

interface InvoiceContextType {
  invoiceData: InvoiceData;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
  updateTickets: (tickets: ticket[]) => void;
  updateTicketServices: (seatCode: string, updatedServices: Service[]) => void;
  updateUserIDTripID: (userID: string | undefined, tripID: string,routeID: string, companyID: string, endTime: string) => void;
  updateInvoiceData: (startLocation: string, endLocation: string, startTime: string, startDate: string , companyName: string) => void;
  resetInvoiceData: () => void;
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
        ticket.services.reduce((serviceTotal, service) => serviceTotal + service.Price * service.quantity, 0),
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

    const totalTicketPrice = updatedTickets.reduce((total, ticket) => total + ticket.price, 0);
    const totalServicePrice = updatedTickets.reduce(
      (total, ticket) =>
        total +
        ticket.services.reduce((serviceTotal, service) => serviceTotal + service.Price * service.quantity, 0),
      0
    );
    const totalPrice = totalTicketPrice + totalServicePrice;

    // Directly update the state with new ticket information
    setInvoiceData((prevData) => ({
      ...prevData,
      tickets: updatedTickets,
      totalPrice: totalPrice,
    }));
  };

  const updateUserIDTripID = (userID: string | undefined, tripID: string, routeID: string, companyID: string, endTime: string) => {
    if(userID === undefined) {
      userID = '';
    }
    setInvoiceData((prevData) => ({
      ...prevData,
      companyID: companyID,
      routeID: routeID,
      userID: userID,
      tripID: tripID,
      endTime: endTime,
    }));
  }

  const updateInvoiceData = (startLocation: string, endLocation: string, startTime: string, startDate: string, companyName: string) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      startLocation: startLocation ?? prevData.startLocation,
      endLocation: endLocation ?? prevData.endLocation,
      startTime: startTime ?? prevData.startTime,
      startDate: startDate ?? prevData.startDate,
      companyName: companyName ?? prevData.companyName,
    }));
  };  

  const resetInvoiceData = () => {
    setInvoiceData(defaultInvoiceData);
  }

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData, updateTickets, updateTicketServices, updateInvoiceData, updateUserIDTripID, resetInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};
