// defaultSeatData.ts
export interface Seat {
    seatCode: string;
    price: number;
    status: string;
  }
  
  export const defaultSeats: Seat[] = [
    { seatCode: 'A01', price: 400000, status: 'bought' },
    { seatCode: 'A02', price: 400000, status: 'bought' },
    { seatCode: 'A03', price: 400000, status: 'bought' },
    { seatCode: 'A04', price: 400000, status: 'notsold' },
    { seatCode: 'A05', price: 400000, status: 'notsold' },
    { seatCode: 'A06', price: 400000, status: 'notsold' },
    { seatCode: 'A07', price: 400000, status: 'notsold' },
    { seatCode: 'A08', price: 400000, status: 'notsold' },
    { seatCode: 'A09', price: 400000, status: 'notsold' },
    { seatCode: 'A10', price: 400000, status: 'notsold' },
    { seatCode: 'B01', price: 400000, status: 'bought' },
    { seatCode: 'B02', price: 400000, status: 'bought' },
    { seatCode: 'B03', price: 400000, status: 'bought' },
    { seatCode: 'B04', price: 400000, status: 'notsold' },
    { seatCode: 'B05', price: 400000, status: 'notsold' },
    { seatCode: 'B06', price: 400000, status: 'notsold' },
    { seatCode: 'B07', price: 400000, status: 'notsold' },
    { seatCode: 'B08', price: 400000, status: 'notsold' },
    { seatCode: 'B09', price: 400000, status: 'notsold' },
    { seatCode: 'B10', price: 400000, status: 'notsold' },
  ];
  