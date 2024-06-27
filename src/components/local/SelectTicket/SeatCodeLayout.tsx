// SeatLayout.tsx
import React, { useState } from 'react';
import Seat from './Seat';
import { useInvoice } from '@/contexts/InvoiceContext';
import { defaultSeats } from '@/constants/SeatData';
import { ticket } from '@/types/invoiceData';
import { toast } from 'sonner';
import { JSX } from 'react/jsx-runtime';

const booking = ["A01", "A02", "A03", "A04", "A05", "A06", "A07"];

const SeatLayout: React.FC = () => {
  const { invoiceData, updateTickets } = useInvoice();
  const [selectedSeats, setSelectedSeats] = useState<ticket[]>(invoiceData.tickets);

  const handleSeatClick = (seatCode: string, price: number) => {
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
      let newSelected = [...selectedSeats, { seatCode: seatCode, price: price, services: [] }];
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

    defaultSeats.forEach((seat) => {
      const prefix = seat.TicketTypeName === 'front' ? 'A' : seat.TicketTypeName === 'back' ? 'C' : 'B';
      
      for (let i = 1; i <= seat.quantity; i++) {
        const seatCode = `${prefix}${i.toString().padStart(2, '0')}`;
        seats.push(
          <Seat
            key={seatCode}
            seatCode={seatCode}
            price={seat.price}
            onClick={handleSeatClick}
            selected={Boolean(selectedSeats.find((selectedTicket) => selectedTicket.seatCode === seatCode))}
            booked={booking.includes(seatCode)}
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
