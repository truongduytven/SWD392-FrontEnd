// defaultSeatData.ts
export interface Seat {
    seatCode: string;
    price: number;
    status: string;
  }
  
export interface Service {
  id: number;
  name: string;
  imageUrl: string
  price: number;
  type: string;
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

  export const ServiceData: Service[] = [
    {
      id: 1,
      name: 'Hamburger',
      price: 400000, // VND (assuming Vietnamese currency)
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'food',
    },
    {
      id: 2,
      name: 'Coffee (Latte)',
      price: 50000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'drink',
    },
    {
      id: 3,
      name: 'Pizza',
      price: 250000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'food',
    },
    {
      id: 4,
      name: 'Fruit Smoothie',
      price: 80000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'drink',
    },
    {
      id: 5,
      name: 'Sushi Platter',
      price: 700000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'food',
    },
    {
      id: 6,
      name: 'Iced Tea (Peach)',
      price: 30000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'drink',
    },
    {
      id: 7,
      name: 'Chicken Curry',
      price: 350000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'food',
    },
    {
      id: 8,
      name: 'Sparkling Water (Lemon)',
      price: 20000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'drink',
    },
    {
      id: 9,
      name: 'Ice Cream Sundae',
      price: 120000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'food',
    },
    {
      id: 10,
      name: 'Fruit Salad',
      price: 100000, // VND
      imageUrl: 'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      type: 'food',
    },
  ];
  
  