// defaultSeatData.ts
// export interface Seat {
//     seatCode: string;
//     price: number;
//     status: string;
//   }

  export interface Seat {
    TicketTypeId: string;
    TicketTypeName: string;
    price: number;
    quantity: number;
  }
  
export interface ServiceDefault {
  id: number;
  name: string;
  imageUrl: string
  price: number;
  type: string;
}

export interface station {
  name: string;
  stationId: number;
}

export const stationData: string[] = [
  'Bến Tre',
  'TP Hồ Chí Minh',
  'Long An',
]

export const defaultSeats: Seat[] = [
  {
    TicketTypeId: '1',
    TicketTypeName: 'front',
    price: 100000,
    quantity: 12,
  },
  {
    TicketTypeId: '2',
    TicketTypeName: 'middle',
    price: 120000,
    quantity: 8,
  },
  {
    TicketTypeId: '3',
    TicketTypeName: 'back',
    price: 140000,
    quantity: 12,
  },
];

// export const defaultSeats: Seat[] = [
//     { seatCode: 'A01', price: 400000, status: 'bought' },
//     { seatCode: 'A02', price: 400000, status: 'bought' },
//     { seatCode: 'A03', price: 400000, status: 'bought' },
//     { seatCode: 'A04', price: 400000, status: 'notsold' },
//     { seatCode: 'A05', price: 400000, status: 'notsold' },
//     { seatCode: 'A06', price: 400000, status: 'notsold' },
//     { seatCode: 'A07', price: 400000, status: 'notsold' },
//     { seatCode: 'A08', price: 400000, status: 'notsold' },
//     { seatCode: 'A09', price: 400000, status: 'notsold' },
//     { seatCode: 'A10', price: 400000, status: 'notsold' },
//     { seatCode: 'B01', price: 400000, status: 'bought' },
//     { seatCode: 'B02', price: 400000, status: 'bought' },
//     { seatCode: 'B03', price: 400000, status: 'bought' },
//     { seatCode: 'B04', price: 400000, status: 'notsold' },
//     { seatCode: 'B05', price: 400000, status: 'notsold' },
//     { seatCode: 'B06', price: 400000, status: 'notsold' },
//     { seatCode: 'B07', price: 400000, status: 'notsold' },
//     { seatCode: 'B08', price: 400000, status: 'notsold' },
//     { seatCode: 'B09', price: 400000, status: 'notsold' },
//     { seatCode: 'B10', price: 400000, status: 'notsold' },
//   ];

  export const ServiceData: ServiceDefault[] = [
    {
      id: 1,
      name: 'Hamburger',
      price: 400000, // VND (assuming Vietnamese currency)
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'food',
    },
    {
      id: 2,
      name: 'Coffee (Latte)',
      price: 50000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'drink',
    },
    {
      id: 3,
      name: 'Pizza',
      price: 250000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'food',
    },
    {
      id: 4,
      name: 'Fruit Smoothie',
      price: 80000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'drink',
    },
    {
      id: 5,
      name: 'Sushi Platter',
      price: 700000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'food',
    },
    {
      id: 6,
      name: 'Iced Tea (Peach)',
      price: 30000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'drink',
    },
    {
      id: 7,
      name: 'Chicken Curry',
      price: 350000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'food',
    },
    {
      id: 8,
      name: 'Sparkling Water (Lemon)',
      price: 20000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'drink',
    },
    {
      id: 9,
      name: 'Ice Cream Sundae',
      price: 120000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'food',
    },
    {
      id: 10,
      name: 'Fruit Salad',
      price: 100000, // VND
      imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2023/9/12/mi-tom-9-3416-1694501408503-1694501408589217157289.jpg',
      type: 'food',
    },
  ];
  
  