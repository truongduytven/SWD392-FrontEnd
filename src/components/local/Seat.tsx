import React from 'react';
import { Seat as SeatType } from '@/constants/SeatData';
import SeatIcon from '@/assets/selectedSeat.svg';
import BoughtSeatIcon from '@/assets/boughtseat.svg';
import NotSoldSeatIcon from '@/assets/notsoldseat.svg';

interface SeatProps {
  seat: SeatType;
  onClick: (seatCode: string) => void;
  selected: boolean;
}

const Seat: React.FC<SeatProps> = ({ seat, onClick, selected }) => {
  const { seatCode, status } = seat;

  let SeatSvg;
  if (status === 'bought') {
    SeatSvg = BoughtSeatIcon;
  } else if (status === 'notsold' && !selected) {
    SeatSvg = NotSoldSeatIcon;
  } else {
    SeatSvg = SeatIcon;
  }

  return (
    <button
      className='relative w-10 h-10 m-2 flex items-center justify-center rounded-md'
      onClick={() => onClick(seatCode)}
      disabled={status === 'bought'}
    >
      <img src={SeatSvg} className="w-full h-full" alt={seatCode} />
      <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
        {seatCode}
      </span>
    </button>
  );
};

export default Seat;
