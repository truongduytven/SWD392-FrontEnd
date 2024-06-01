import { Seat as SeatType } from '@/constants/SeatData';
import React from 'react';

interface SeatProps {
  seat: SeatType
  onClick: (seatCode: string) => void;
  selected: boolean;
}

const Seat: React.FC<SeatProps> = ({ seat, onClick, selected }) => {
  const { seatCode, status } = seat;

  return (
    <button
      className={`w-11 h-11 m-2 flex items-center justify-center rounded-md border ${selected ? 'bg-red-500 text-white' : (status === 'bought' ? 'bg-gray-200 cursor-not-allowed' : 'bg-green-500')}`}
      onClick={() => onClick(seatCode)}
      disabled={status === 'bought'}
    >
      {seatCode}
    </button>
  );
};

export default Seat;
