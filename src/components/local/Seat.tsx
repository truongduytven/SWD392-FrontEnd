import React from 'react';

interface SeatProps {
  seat: {
    seatCode: string;
    price: number;
  };
  onClick: (seatCode: string) => void;
  selected: boolean;
}

const Seat: React.FC<SeatProps> = ({ seat, onClick, selected }) => {
  const { seatCode } = seat;

  return (
    <button
      className={`w-8 h-8 m-2 flex items-center justify-center rounded-md border ${selected ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
      onClick={() => onClick(seatCode)}
    >
      {seatCode}
    </button>
  );
};

export default Seat;
