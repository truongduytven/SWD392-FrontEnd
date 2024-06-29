// Seat.tsx
import React from 'react';
import SeatIcon from '@/assets/selectedSeat.svg';
import BoughtSeatIcon from '@/assets/boughtseat.svg';
import FrontSeatIcon from '@/assets/front_seat.svg';
import BackSeatIcon from '@/assets/back_seat.svg';
import MiddleSeatIcon from '@/assets/middle_seat.svg';

interface SeatProps {
  seatCode: string;
  price: number;
  onClick: (seatCode: string, price: number, ticketType_TripID: string) => void;
  selected: boolean;
  booked: boolean;
  ticketType_TripID: string;
}

const Seat: React.FC<SeatProps> = ({ seatCode, price, onClick, selected, booked, ticketType_TripID }) => {
  let SeatSvg;
  seatCode.startsWith('A') ? SeatSvg = FrontSeatIcon : seatCode.startsWith('B') ? SeatSvg = MiddleSeatIcon : SeatSvg = BackSeatIcon;
  if (booked) {
    SeatSvg = BoughtSeatIcon;
  } else if (selected) {
    SeatSvg = SeatIcon;
  }

  return (
    <button
      className={`relative w-10 h-10 m-2 flex items-center justify-center rounded-md ${booked && 'cursor-not-allowed'}`}
      onClick={() => onClick(seatCode, price, ticketType_TripID)}
      disabled={booked}
    >
      <img src={SeatSvg} className="w-full h-full" alt={seatCode} />
      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
        {seatCode}
      </span>
    </button>
  );
};

export default Seat;
