// SeatLayout.tsx
import React, { useState } from 'react';
import Seat from './Seat';
import { useInvoice } from '@/contexts/InvoiceContext';
import { defaultSeats } from '@/constants/SeatData';
import { ticket } from '@/types/invoiceData';
import { toast } from 'sonner';
import { JSX } from 'react/jsx-runtime';
import { useGetTripData } from '@/apis/ticketAPI';
import { ITicketModels } from '@/types/ticketInterface';

const booking = ["A01", "A02", "A03", "A04", "A05", "A06", "A07"];
interface SeatLayoutProps {
  tripModels: ITicketModels
}

function SeatLayout({ tripModels }: SeatLayoutProps) {
  const { invoiceData, updateTickets } = useInvoice();
  const [selectedSeats, setSelectedSeats] = useState<ticket[]>(invoiceData.tickets);
  const { data } = useGetTripData({ tripID: invoiceData.tripID });

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

    data?.ticketType_TripModels.forEach((seat) => {
      const prefix = seat.ticketName === 'Hàng đầu' ? 'A' : seat.ticketName === 'Hàng sau' ? 'C' : 'B';
      
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
