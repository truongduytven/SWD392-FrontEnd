// SeatLayout.tsx
import { useState } from 'react';
import Seat from './Seat';
import { useInvoice } from '@/contexts/InvoiceContext';
import { ticket } from '@/types/invoiceData';
import { toast } from 'sonner';
import { JSX } from 'react/jsx-runtime';
import { ITicketModels } from '@/types/ticketInterface';
import { formatSeatCode } from '@/lib/utils';
interface SeatLayoutProps {
  tripModels: ITicketModels[]
  seatBooked: string[]
}

function SeatLayout({ tripModels, seatBooked }: SeatLayoutProps) {
  const { invoiceData, updateTickets } = useInvoice();
  const [selectedSeats, setSelectedSeats] = useState<ticket[]>(invoiceData.tickets);
  tripModels.sort((a, b) => a.TicketName === 'Hàng đầu' ? -1 : a.TicketName === 'Hàng sau' ? 1 : 0);

  const handleSeatClick = (seatCode: string, price: number, ticketType_TripID: string) => {
    if (selectedSeats.find((ticket) => ticket.seatCode === seatCode)) {
      let newSelected = selectedSeats.filter((ticket) => ticket.seatCode !== seatCode);
      // const newTickets = newSelected.map((selectedTicket) => {
      //   const seatService = invoiceData.tickets.find((ticket) => ticket.seatCode === selectedTicket.seatCode)!;
      //   if(seatService) {
      //     return {...selectedTicket, services: seatService.services};
      //   }
      // });
      updateTickets(newSelected);
      setSelectedSeats(newSelected);
    } else if (selectedSeats.length === 5) {
      toast.warning('Chỉ được chọn tối đa 5 ghế');
      return;
    } else {
      let newSelected = [...selectedSeats, { seatCode: seatCode, price: price, ticketType_TripID: ticketType_TripID, services: [] }];
      // const newTickets = newSelected.map((code) => {
      //   const seatService = invoiceData.tickets.find((ticket) => ticket.seatCode === code)!;
      //   return { seatCode: seatCode, price: price, services: (seatService ? seatService.services : []) } as ticket;
      // });
      updateTickets(newSelected);
      setSelectedSeats(newSelected);
    }
  };

  const renderSeats = () => {
    const seats: JSX.Element[] = [];

    tripModels.forEach((seat) => {
      const prefix = seat.TicketName === 'Hàng đầu' ? 'A' : seat.TicketName === 'Hàng sau' ? 'C' : 'B';
      
      for (let i = 1; i <= seat.Quantity; i++) {
        const seatCode = `${prefix}${i.toString().padStart(2, '0')}`;
        seats.push(
          <Seat
            key={seatCode}
            ticketType_TripID={seat.TicketType_TripID}
            seatCode={seatCode}
            price={seat.Price}
            onClick={handleSeatClick}
            selected={Boolean(selectedSeats.find((selectedTicket) => selectedTicket.seatCode === seatCode))}
            booked={seatBooked.includes(formatSeatCode(seatCode))}
          />
        );
      }
    });

    return seats;
  };

  return (
    <div className='flex flex-col items-center my-2'>
      <div className='text-lg font-semibold mb-4'>Sơ đồ chỗ ngồi</div>
      <div className='grid grid-cols-4 gap-4'>
        {renderSeats()}
      </div>
    </div>
  );
};

export default SeatLayout;
