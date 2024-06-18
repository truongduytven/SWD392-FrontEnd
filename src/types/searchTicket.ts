
 interface Station {
    stationName: string;
    price: number;
  }
  
  interface Trip {
    userName: string;
    route: string;
    company: string;
    date: string;
    time: string;
    position: string;
  }
  
export interface ISearchTicket {
    price: {
      price: number;
      stations: Station[];
    };
    trip: Trip;
    totalBill: number;
    qrCodeImage: string;
    qrCode: string;
  }