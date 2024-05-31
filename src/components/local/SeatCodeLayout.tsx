// SeatLayout.tsx
import React, { useState } from 'react';
import Seat from './Seat';
import { useInvoice } from '@/contexts/InvoiceContext';
import { defaultSeats } from '@/constants/SeatData';

const SeatLayout: React.FC = () => {
  const { invoiceData, updateTickets } = useInvoice();
  const [selectedSeats, setSelectedSeats] = useState<string[]>(invoiceData.tickets.map(ticket => ticket.seatCode));

  const handleSeatClick = (seatCode: string) => {
    setSelectedSeats((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(seatCode)) {
        newSelected = prevSelected.filter((code) => code !== seatCode);
      } else {
        newSelected = [...prevSelected, seatCode];
      }
      updateTickets(newSelected.map(code => defaultSeats.find(seat => seat.seatCode === code)!));
      return newSelected;
    });
  };
  const seats = invoiceData.tickets;
  const rows = []
  for(let i = 0; i < selectedSeats.length; i++) {
    rows.push(seats.slice(i, i + 2));
  }

  return (
    <div className="flex flex-wrap items-center">
      {defaultSeats.map((seat) => (
        <Seat
          key={seat.seatCode}
          seat={seat}
          onClick={handleSeatClick}
          selected={selectedSeats.includes(seat.seatCode)}
        />
      ))}
    </div>
  );
};

export default SeatLayout;
